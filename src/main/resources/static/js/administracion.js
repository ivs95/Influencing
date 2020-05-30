document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("influencerAdmin").onclick = b => cargaResultadosInfluencer();
    document.getElementById("propuestasAdmin").onclick = b => cargaResultadosPropuestas(); 
    document.getElementById("denunciasAdmin").onclick = b => cargaResultadosDenuncias();
    document.getElementById("empresasAdmin").onclick = b => cargaResultadosEmpresas();
    prepareListeners();
    lanzaAlert();

	ws.receive = json => {
		if (document.getElementById("indiceNumNotificaciones").style.display == "none"){
			document.getElementById("indiceNumNotificaciones").style.display = "block";
		}
		document.getElementById("btnNumeroNotificaciones").innerText = parseInt(document.getElementById("btnNumeroNotificaciones").innerText) + 1;


 		//addNotificaciones(json, document.getElementById(divNotificaciones));
	}

});

function addNotificaciones(json, contenedor){
	let html = []
	
		json.forEach(msg => {
			let clase = msg.propio ? 'mensaje enviado' : 'mensaje recibido';
			html.push("<p class='" + clase + " msg'> " + parseaFecha(msg.sent) + " - " + msg.text + "</p>");
		})
}


function prepareListeners(){
    for (let p of document.getElementsByClassName("verificarEmpresa")){
        p.onclick =  c => { verifica('EMPRESA', p.dataset.id);}
    }
    for (let p of document.getElementsByClassName("verEmpresa")){
        p.onclick = c =>{ cargaContenidoModal('USUARIO', p.dataset.id);}
    }
    for (let p of document.getElementsByClassName("eliminarEmpresa")){
        p.onclick = c =>{ elimina('EMPRESA', p.dataset.id);}
    }
    for (let p of document.getElementsByClassName("verificarPropuesta")){
        p.onclick = c =>{ verifica('PROPUESTA', p.dataset.id);}
    } 
    for (let p of document.getElementsByClassName("verPropuesta")){
        p.onclick = c =>{ cargaContenidoModal('PROPUESTA', p.dataset.id);}

    }
    for (let p of document.getElementsByClassName("eliminarPropuesta")){
        p.onclick = c =>{ elimina('PROPUESTA', p.dataset.id);}

    }
    for (let p of document.getElementsByClassName("verificarInfluencer")){
        p.onclick = c =>{ verifica('INFLUENCER', p.dataset.id);}

    }
    for (let p of document.getElementsByClassName("verInfluencer")){
        p.onclick = c =>{ cargaContenidoModal('USUARIO', p.dataset.id);}
    }
    for (let p of document.getElementsByClassName("eliminarInfluencer")){
        p.onclick = c =>{ elimina('INFLUENCER', p.dataset.id);}
    }
    for (let p of document.getElementsByClassName("tramitarDenuncia")){
        p.onclick = c =>{ cargaContenidoModal('DENUNCIA-TRAMITAR', p.dataset.id);}
    }
    for (let p of document.getElementsByClassName("verDenuncia")){
        p.onclick = c =>{ cargaContenidoModal('DENUNCIA-VER', p.dataset.id);}
    }

}

function cargaResultadosInfluencer(){
        return go2(config.rootUrl + "admin/influencers", 'GET')
        .then(html => { 
            var  div = document.getElementById("tablaAdministracion");
            div.innerHTML = html;
            prepareListeners();
        })
            .catch(e => console.log(e))
    
    
}

function cargaResultadosEmpresas(){
    return go2(config.rootUrl + "admin/empresas", 'GET')
    .then(html => { 
        var  div = document.getElementById("tablaAdministracion");
        div.innerHTML = html;
        prepareListeners();

    })
        .catch(e => console.log(e))
}

function cargaResultadosDenuncias(){
    return go2(config.rootUrl + "admin/denuncias", 'GET')
    .then(html => { 
        var  div = document.getElementById("tablaAdministracion");
        div.innerHTML = html;
        prepareListeners();

    })
        .catch(e => console.log(e))
}

function cargaResultadosPropuestas(){
    return go2(config.rootUrl + "admin/propuestas", 'GET')
    .then(html => { 
        var  div = document.getElementById("tablaAdministracion");
        div.innerHTML = html;
        prepareListeners();

    })
        .catch(e => console.log(e))
}

function elimina(tipo, id){
    if (tipo === 'EMPRESA'){
        return go2(config.rootUrl + "admin/eliminaEmpresa?id=" + id, 'GET')
        .then(html => { 
            var  div = document.getElementById("tablaAdministracion");
            div.innerHTML = html;
            prepareListeners();

        })
            .catch(e => console.log(e))
    }
    else if (tipo === 'INFLUENCER'){
        return go2(config.rootUrl + "admin/eliminaInfluencer?id=" + id, 'GET')
        .then(html => { 
            var  div = document.getElementById("tablaAdministracion");
            div.innerHTML = html;
            prepareListeners();

        })
            .catch(e => console.log(e))
    }
    else if (tipo === 'PROPUESTA'){
        return go2(config.rootUrl + "admin/eliminaPropuesta?id=" + id, 'GET')
        .then(html => { 
            var  div = document.getElementById("tablaAdministracion");
            div.innerHTML = html;
            prepareListeners();

        })
            .catch(e => console.log(e))
    }
}

function tramita(id){
	
}

function verifica(tipo, id){
    if (tipo === 'EMPRESA'){
        return go2(config.rootUrl + "admin/verificaEmpresa?id=" + id, 'GET')
    .then(html => { 
        var  div = document.getElementById("tablaAdministracion");
        div.innerHTML = html;
        prepareListeners();

    })
        .catch(e => console.log(e))
    }
    else if (tipo === 'INFLUENCER'){
        return go2(config.rootUrl + "admin/verificaInfluencer?id=" + id, 'GET')
    .then(html => { 
        var  div = document.getElementById("tablaAdministracion");
        div.innerHTML = html;
        prepareListeners();

    })
        .catch(e => console.log(e))
    }
    else if (tipo === 'PROPUESTA'){
        return go2(config.rootUrl + "admin/verificaPropuesta?id=" + id, 'GET')
    .then(html => { 
        var  div = document.getElementById("tablaAdministracion");
        div.innerHTML = html;
        prepareListeners();

    })
        .catch(e => console.log(e))
    }
}


function cargaContenidoModal(tipo, id){
    if (tipo === 'USUARIO'){
        document.getElementById('modal').style.display='block';
        return go2(config.rootUrl + "perfil?idUsuario=" + id, 'GET')
            .then(html => document.getElementById("contenidoModal").innerHTML=html);
    }
    else if (tipo === 'PROPUESTA'){
        document.getElementById('modal').style.display='block';
        return go2(config.rootUrl + "propuesta?idPropuesta=" + id, 'GET')
            .then(html => document.getElementById("contenidoModal").innerHTML=html);
    }
	else if (tipo ==='DENUNCIA-TRAMITAR'){
		        document.getElementById('modal').style.display='block';
	        return go2(config.rootUrl + "denuncia/tramitar?idDenuncia=" + id, 'GET')
	            .then(html => document.getElementById("contenidoModal").innerHTML=html);
	}
	else if (tipo ==='DENUNCIA-VER'){
		        document.getElementById('modal').style.display='block';
	        return go2(config.rootUrl + "denuncia/ver?idDenuncia=" + id, 'GET')
	            .then(html => document.getElementById("contenidoModal").innerHTML=html);
	}
}