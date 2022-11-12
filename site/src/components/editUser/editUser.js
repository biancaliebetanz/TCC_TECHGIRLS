import './editUser.scss'

export default function Edit(){
    
    return(
        <div className="user">
          <div className="info1">
            <h1>Edite Seus Dados</h1>
          <div>
                <p>Nome</p>
                <input></input>
            </div>
            <div>
                <p>E-mail</p>
                <input></input>
            </div>
            <div>
                <p>Telefone</p>
                <input></input>
            </div>
          </div>
           <div className="info2">
           <div>
                <p>CPF</p>
                <input></input>
            </div>
            <div>
                <p>RG</p>
                <input></input>
            </div>
            <div>
                <p>Data de Nascimento</p>
                <input type='date'></input>
            </div>
            
           </div>
           <button>Salvar</button>
        </div>
    )
}