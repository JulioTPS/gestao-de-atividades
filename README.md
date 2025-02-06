# gestao-de-atividades

projeto de refatoração baseado em https://github.com/IndraMahayana/to-do-List

refatorado utilizando os padrões de projeto Factory e Singleton:

    Singleton > Garantiu que a classe TodoList tenha apenas uma instância, evitando a criação de múltiplos objetos. Isso é feito verificando se a instância já existe e, caso contrário, criando e armazenando a 
    instância.
    
    Factory Method > A classe TodoFactory centraliza a criação de elementos HTML para representar as tarefas. O método createTodoElement cria de forma consistente os elementos necessários para cada tarefa, facilitando a manutenção e extensão da interface.