import React from 'react';

export default (props, context) => (
	<div>
		<span>Voocê tem certeza que deseja sair do sistema?</span>
		<button onClick={() => props.authActions.logout()}>Sim</button>
		<button onClick={()=> props.routeActions.goBack()}>Não</button>
	</div>
);
