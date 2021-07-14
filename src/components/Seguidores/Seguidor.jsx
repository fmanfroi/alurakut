import React from 'react';

const Seguidor = props => {
    const { login } = props;
    return (
        <li>
            <a href={`/users/${login}`} key={login}>
                <img src={`https://github.com/${login}.png`} />
                <span>{login}</span>
            </a>
        </li>
    );
};

export default Seguidor
