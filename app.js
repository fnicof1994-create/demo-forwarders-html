// ===== app.js =====

const state = {
  role: "cliente",
  view: "embarques"
};

function applyRoleUI(){
  const role = state.role;
  document.querySelectorAll(".only-forwarder").forEach(el=>{
    el.style.display = role === "forwarder" ? "" : "none";
  });
}

function setView(v){
  state.view = v;

  // Active state en el menú
  document.querySelectorAll(".sidenav__item").forEach(a=>{
    a.classList.toggle("is-active", a.dataset.view === v);
  });

  // Mostrar/ocultar vistas
  document.querySelectorAll(".view").forEach(vw => vw.classList.remove("visible"));
  const tgt = document.querySelector(`#view-${v}`);
  if (tgt) tgt.classList.add("visible");
}

window.addEventListener("DOMContentLoaded", ()=>{
  // Rol
  const roleSelect = document.getElementById("roleSelect");
  roleSelect.value = state.role;
  roleSelect.addEventListener("change", (e)=>{
    state.role = e.target.value;
    applyRoleUI();
  });
  applyRoleUI();

  // Navegación lateral
  document.querySelectorAll(".sidenav__item").forEach(a=>{
    a.addEventListener("click", ()=> setView(a.dataset.view));
  });

  // Botones demo
  document.getElementById("btnNuevo")?.addEventListener("click", ()=>{
    if(state.role !== "forwarder"){ alert("Solo el forwarder puede crear embarques (demo)."); return; }
    alert("Acción demo: crear embarque.");
  });
  document.getElementById("btnCargarDemo")?.addEventListener("click", ()=> alert("Demo restaurada."));
  document.getElementById("btnBorrarTodo")?.addEventListener("click", ()=> alert("Demo borrada."));

  // Vista inicial
  setView(state.view);
});

