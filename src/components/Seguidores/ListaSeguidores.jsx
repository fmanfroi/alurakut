import React from 'react';
import Seguidor from './Seguidor';

const Seguidores = props => {
    const { filterText, segimores } = props;
    const rows = [];

    segimores.forEach((seguidor) => {
        const { login, id } = seguidor;
        if (login.indexOf(filterText) === -1) {
            return;
        }
        console.log("Add => ", seguidor.login);
        rows.push(
            <Seguidor key={id} login={login} />
        );
    });

    return (
        <ul>
            {rows}
        </ul>
    );

};

export default Seguidores;