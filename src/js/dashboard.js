import { Alert } from "./alerts";
import { dashboardGuard, isAdmin } from "./guards";
import { logout } from "./login";
import { redirectTo } from "./router";
import Swal from "sweetalert2";

const API_URL = "http://localhost:3000";

export function dashboardSetup() {
  dashboardGuard();
  renderPets();

  //Make functions global
  window.deletePet = deletePet;

  //Take DOM References
  const newPetModal = document.getElementById("pet-form-modal");
  const addPetBtn = document.getElementById("add-pet-btn");
  const goHomeBtn = document.getElementById("go-home-btn");
  const logOutBtn = document.getElementById("logout-btn");
  const cancelPetBtn = document.getElementById("cancel-pet-form");

  //Form
  const petForm = document.getElementById("pet-form");
  const petNameInput = document.getElementById("pet-name");
  const petWeightInput = document.getElementById("pet-weight");
  const petAgeInput = document.getElementById("pet-age");
  const petRaceInput = document.getElementById("pet-race");
  const petDetailsInput = document.getElementById("pet-details");
  const petTemperamentInput = document.getElementById("pet-temperament");
  const petImageInput = document.getElementById("pet-image");

  //Add listeners
  addPetBtn.addEventListener("click", () => {
    newPetModal.classList.toggle("hidden");
  });

  cancelPetBtn.addEventListener("click", () => {
    newPetModal.classList.toggle("hidden");
  });

  goHomeBtn.addEventListener("click", () => {
    redirectTo("/");
  });

  logOutBtn.addEventListener("click", () => {
    logout();
  });

  //Modify Pets
  petForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    //Take values
    const petName = petNameInput.value.trim();
    const petWeight = petWeightInput.value;
    const petAge = petAgeInput.value;
    const petRace = petRaceInput.value.trim();
    const petDetails = petDetailsInput.value.trim();
    const petTemperament = petTemperamentInput.value.trim();
    const petImage = petImageInput.value.trim() || "";
    const userId = JSON.parse(localStorage.getItem("currentUser")).id;

    if (
      arePetDetailsValid(
        petName,
        petWeight,
        petAge,
        petRace,
        petTemperament,
        petImage
      )
    ) {
      const newPet = {
        name: petName,
        weight: petWeight,
        age: petAge,
        race: petRace,
        details: petDetails,
        temperament: petTemperament,
        image: petImage || "../../public/images/default-dog.webp",
        userId: userId,
      };

      let request = await fetch(`${API_URL}/pets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPet),
      });

      if (request.ok) {
        Alert.success("La mascota ha sido añadida con exito!");
        renderPets();
      } else {
        Alert.error(`Error: ${request.status}, vuelva a intentarlo mas tarde`);
      }
    }

    newPetModal.classList.toggle("hidden");
    petNameInput.value = "";
    petWeightInput.value = "";
    petAgeInput.value = "";
    petRaceInput.value = "";
    petDetailsInput.value = "";
    petTemperamentInput.value = "";
    petImageInput.value = "";
  });
}

async function renderPets() {
  const petContainer = document.getElementById("pets-container");

  //Clear all info before start rendering
  petContainer.innerHTML = "";

  const request = await fetch(`${API_URL}/pets`);
  const data = await request.json();

  if (!data || data.length === 0) {
    Alert.warning("No hay mascotas para mostrar.");
    return;
  }

  let pets;

  if (!isAdmin()) {
    const userInfo = JSON.parse(localStorage.getItem("currentUser"));
    // Asigna el valor filtrado a la variable 'pets'
    pets = data.filter((pet) => pet.userId == userInfo.id);
    if (pets.length === 0) {
      Alert.warning("No tienes mascotas registradas.");
      return;
    }
  } else {
    // Si es admin, asigna todos los datos
    pets = data;
  }

  // Itera sobre el array de mascotas y agrega cada tarjeta
  pets.forEach((pet) => {
    petContainer.innerHTML += `
      <div class="pet-card">
        <img
          src="${pet.image}"
          alt="Imagen de ${pet.name}"
          title="${pet.name}"
        />
        <h3>${pet.name}</h3>
        <p><strong>Raza:</strong> ${pet.race}</p>
        <p><strong>Edad:</strong> ${pet.age} años</p>

        <div class="card-buttons">
          <button class="edit-btn")>Editar</button>
          <button class="delete-btn" onclick="deletePet('${pet.id}')">Eliminar</button>
        </div>
      </div>`;
  });
}

async function deletePet(petId) {
  const result = await Swal.fire({
    icon: "question",
    title: "¿Estás seguro?",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#dc3545",
  });

  if (result.isConfirmed) {
    let request = await fetch(`${API_URL}/pets/${petId}`, {
      method: "DELETE",
    });

    if (request.ok) {
      Alert.success("Mascota eliminada con éxito!");
      renderPets();
    } else {
      Alert.error(`Error: ${request.status}, por favor intenta más tarde.`);
    }
  }
}

function arePetDetailsValid(
  petName,
  petWeight,
  petAge,
  petRace,
  petTemperament,
  petImage
) {
  // Regular expression to validate names and races (letters and spaces only)
  const textRegex = /^[a-zA-Z\s]+$/;

  // 1. Validate the name: must not be empty and must contain only letters.
  if (!petName || !textRegex.test(petName)) {
    Alert.warning(
      "El nombre es inválido. Debe contener solo letras y no puede estar vacío."
    );
    return false;
  }

  // 2. Validate the weight: must be a positive number.
  const numericWeight = parseFloat(petWeight);
  if (isNaN(numericWeight) || numericWeight <= 0) {
    Alert.warning(
      "El peso es inválido. Por favor, ingrese un número positivo."
    );
    return false;
  }

  // 3. Validate the age: must be a non-negative integer.
  const numericAge = parseInt(petAge, 10);
  if (isNaN(numericAge) || numericAge < 0) {
    Alert.warning(
      "La edad es inválida. Por favor, ingrese un número entero no negativo."
    );
    return false;
  }

  // 4. Validate the race: must not be empty and must contain only letters.
  if (!petRace || !textRegex.test(petRace)) {
    Alert.warning(
      "La raza es inválida. Debe contener solo letras y no puede estar vacía."
    );
    return false;
  }

  // 5. Validate the temperament: must not be empty.
  if (!petTemperament.trim()) {
    Alert.warning("El temperamento no puede estar vacío.");
    return false;
  }

  // 6. Validate the image URL (optional): if provided, it must be a valid image URL.
  if (petImage && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/i.test(petImage)) {
    Alert.warning("La URL de la imagen no es válida.");
    return false;
  }

  // If all checks pass, the data is valid.
  return true;
}
