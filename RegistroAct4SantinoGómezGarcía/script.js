const form = document.getElementById("lnrForm");
const registrarBtn = document.getElementById("registrarBtn");
const email = document.getElementById("email");
const emailFeedback = document.getElementById("emailFeedback");
const categoriaCheckboxes = document.querySelectorAll(".categoria-checkbox");
const categoriaFeedback = document.getElementById("categoriaFeedback");
const fotoPerfil = document.getElementById("fotoPerfil");
const previewFoto = document.getElementById("previewFoto");
const certificadoSeguridad = document.getElementById("certificadoSeguridad");

function validarEmail() {
  const emailVal = email.value.trim();
  const valido = emailVal.endsWith("@escuela.edu.ar");
  emailFeedback.innerHTML = valido ? "✔️" : "❌";
  return valido;
}

function validarCategorias() {
  const algunaSeleccionada = Array.from(categoriaCheckboxes).some(cb => cb.checked);
  categoriaFeedback.innerHTML = algunaSeleccionada ? "" : "❌ Selecciona al menos una categoría.";
  return algunaSeleccionada;
}

function previsualizarFoto(event) {
  const file = event.target.files[0];
  if (file && file.size <= 2 * 1024 * 1024) {
    const reader = new FileReader();
    reader.onload = () => {
      previewFoto.innerHTML = `<img src="\${reader.result}" alt="Previsualización" />`;
    };
    reader.readAsDataURL(file);
  } else {
    previewFoto.innerHTML = "❌ Tamaño inválido o formato no admitido.";
  }
}

function validarCertificado() {
  const necesitaCert = Array.from(categoriaCheckboxes).some(cb => ["sumo", "minisumo"].includes(cb.value) && cb.checked);
  const archivo = certificadoSeguridad.files[0];
  if (necesitaCert && (!archivo || archivo.size > 5 * 1024 * 1024)) {
    return false;
  }
  return true;
}

function validarFormulario() {
  const valido = validarEmail() && validarCategorias() && fotoPerfil.files.length > 0 && validarCertificado();
  registrarBtn.disabled = !valido;
}

email.addEventListener("input", validarFormulario);
categoriaCheckboxes.forEach(cb => cb.addEventListener("change", validarFormulario));
fotoPerfil.addEventListener("change", previsualizarFoto);
form.addEventListener("change", validarFormulario);

form.addEventListener("submit", e => {
  e.preventDefault();
  setTimeout(() => {
    alert("✅ Equipo registrado en LNR. ¡Buena suerte!");
    localStorage.setItem("equiposRegistrados", parseInt(localStorage.getItem("equiposRegistrados") || 0) + 1);
    form.reset();
    previewFoto.innerHTML = "";
    registrarBtn.disabled = true;
  }, 1500);
});

document.getElementById("borrarBtn").addEventListener("click", () => {
  previewFoto.innerHTML = "";
  emailFeedback.innerHTML = "";
  categoriaFeedback.innerHTML = "";
  registrarBtn.disabled = true;
});