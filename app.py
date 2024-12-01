import firebase_admin
from firebase_admin import credentials, firestore, auth
from flask import Flask, jsonify, request, render_template

# Inicializando o Firebase com as credenciais baixadas
cred = credentials.Certificate("trabalho-4516f-firebase-adminsdk-srqvy-b3433af630.json")
firebase_admin.initialize_app(cred)

# Inicializando o Firestore
db = firestore.client()

# Inicializando o Flask
app = Flask(__name__)

@app.route('/')
def homepage():
    return render_template("homepage.html")

# Rota de exemplo para adicionar um usuário no Firestore
@app.route('/add_user', methods=['POST'])
def add_user():
    try:
        # Pegando os dados do corpo da requisição (JSON)
        user_data = request.get_json()
        item = user_data['item']

        # Adicionando o usuário ao Firestore
        user_ref = db.collection('users').add({
            'item': item,
        })

        return jsonify({"message": "User added successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Rota de exemplo para pegar todos os usuários do Firestore
@app.route('/get_users', methods=['GET'])
def get_users():    
    try:
        users_ref = db.collection('users')
        users = users_ref.stream()
        users_list = [{'id': user.id, 'data': user.to_dict()} for user in users]

        return jsonify(users_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/get_users_page')
def get_users_page():
    return render_template("get_users.html")


@app.route('/buscar', methods=['GET'])
def buscar_item():
    nome = request.args.get('item')  # Obtém o parâmetro 'nome' da query string

    if not nome:
        return jsonify({'message': 'Por favor, forneça o nome do item.'}), 400

    # Consulta Firestore para buscar o item
    items_ref = db.collection('users')  # Coleção "itens"
    query = items_ref.where('item', '==', nome)
    results = query.stream()

    # Armazena os itens encontrados
    itens = []
    for doc in results:
        itens.append({'id': doc.id, **doc.to_dict()})

    if not itens:
        return jsonify({'message': 'Nenhum item encontrado com esse nome.'}), 404

    return jsonify(itens)


@app.route('/atualizar', methods=['PUT'])
def atualizar_item():
    # Obtém os dados da requisição
    data = request.get_json()

    if 'id' not in data or 'nome' not in data:
        return jsonify({'message': 'ID e nome são obrigatórios'}), 400

    item_id = data['id']
    novo_nome = data['nome']

    # Referência para o documento no Firestore com o ID fornecido
    item_ref = db.collection('users').document(item_id)

    # Atualiza o documento com os novos dados
    item_ref.update({
        'item': novo_nome
    })

    return jsonify({'message': f'Item com ID {item_id} atualizado com sucesso!'}), 200
    

@app.route('/alterar')
def alterar():
    return render_template("alterar.html")

if __name__ == '__main__':
    app.run(debug=True)
