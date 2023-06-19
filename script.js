document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('user-form');
    var userList = document.getElementById('user-list');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      var name = document.getElementById('name').value;
      var email = document.getElementById('email').value;
  
      if (name && email) {
        var user = {
          name: name,
          email: email
        };
  
        // Salva os dados no localStorage
        var users = getUsersFromLocalStorage();
        users.push(user);
        saveUsersToLocalStorage(users);
  
        // Limpa o formulário
        form.reset();
  
        // Atualiza a lista de usuários
        displayUsers();
      }
    });
  
    function getUsersFromLocalStorage() {
      var users = JSON.parse(localStorage.getItem('users')) || [];
      return users;
    }
  
    function saveUsersToLocalStorage(users) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  
    function displayUsers() {
      // Limpa a lista de usuários
      userList.innerHTML = '';
  
      // Obtém os usuários do localStorage
      var users = getUsersFromLocalStorage();
  
      // Exibe cada usuário na lista
      users.forEach(function(user) {
        var li = document.createElement('li');
        li.innerHTML = '<strong>' + user.name + '</strong> (' + user.email + ')';
  
        var editLink = document.createElement('a');
        editLink.href = '#';
        editLink.innerText = 'Excluir';
        editLink.addEventListener('click', function() {
          editUser(user);
        });
  
        li.appendChild(editLink);
        userList.appendChild(li);
      });
    }
  
    function editUser(user) {
      var nameField = document.getElementById('name');
      var emailField = document.getElementById('email');
  
      // Preenche o formulário com os dados do usuário
      nameField.value = user.name;
      emailField.value = user.email;
  
      // Remove o usuário da lista
      var users = getUsersFromLocalStorage();
      var index = users.findIndex(function(u) {
        return u.email === user.email;
      });
      if (index !== -1) {
        users.splice(index, 1);
        saveUsersToLocalStorage(users);
      }
    }
  
    // Chama a função para exibir os usuários ao carregar a página
    displayUsers();
  });