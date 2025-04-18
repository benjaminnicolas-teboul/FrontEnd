const fetchLogins = (email, password) => {
  const userData = {
    email,
    password,
  };

  return fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur réseau : " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      sessionStorage.setItem("token", JSON.stringify(data));
      console.log("Connexion réussie");
      document.location.href = "../index.html";
      return data;
    })
    .catch((error) => {
      console.error("Erreur lors de la connexion:", error);
      document.getElementById("errorMessage").innerText =
        "Votre mail ou mot de passe est incorrect.";
      return null;
    });
};

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const email = emailInput.value;
    const password = passwordInput.value;

    fetchLogins(email, password);
  });
