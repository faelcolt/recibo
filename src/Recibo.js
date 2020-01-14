import React from 'react';
import './Recibo.css';
import cabeçalho from './images/cabecalho.jpeg';

function Recibo() {
    return (
        <div style={{ margin: '8px' }}>
            <input type='file' name='imagem' style={{ display: 'none' }} />

            <div style={{ width: '100%' }}>
                <img
                    style={{ width: '100%' }}
                    src={cabeçalho}
                    alt='Imagem do Cabeçalho'
                />
            </div>

            <Cabecalho />
            <Tabela />
        </div>
    );
}

function Cabecalho() {
    const p2 = p => (p < 10 ? '0' + p : p);

    const data = new Date();
    const ano = data.getFullYear();
    const mes = p2(data.getMonth() + 1);
    const dia = p2(data.getDate());
    const hoje = `${dia}/${mes}/${ano}`;

    return (
        <>
            <div style={{ display: 'flex' }}>
                <label htmlFor='nome'>Cliente: </label>
                <input type='text' name='nome' id='nome' style={{ flex: 1 }} />
            </div>

            <div style={{ display: 'flex' }}>
                <label htmlFor='endereço'>Endereço: </label>
                <input
                    type='text'
                    name='endereço'
                    id='endereço'
                    style={{ flex: 1 }}
                />
            </div>

            <div style={{ display: 'flex' }}>
                <label htmlFor='telefone'>Telefone: </label>
                <input
                    type='tel'
                    name='telefone'
                    id='telefone'
                    style={{ minWidth: '120px', flex: '1 1 100%' }}
                />

                <input
                    type='text'
                    name='data'
                    id='data'
                    defaultValue={hoje}
                    style={{ minWidth: '85px' }}
                />
            </div>
        </>
    );
}

function Tabela() {
    return (
        <div style={{ overflow: 'auto' }}>
            <table>
                <colgroup>
                    <col style={{ width: '10%' }} />
                    <col />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '20%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <th className='number-format'>Qtd.</th>
                        <th>Descrição</th>
                        <th className='number-format'>Valor Unitário</th>
                        <th className='number-format'>Valor Total</th>
                    </tr>
                </thead>
                <tbody>
                    {<Linha />}
                    {<Linha />}
                    {<Linha />}
                    {<Linha />}
                    {<Linha />}
                    {<Linha />}
                    {<Linha />}
                </tbody>
                <tfoot>
                    <tr>
                        <th
                            colSpan='3'
                            scope='row'
                            style={{ textAlign: 'right' }}
                        >
                            Total Geral
                        </th>
                        <td>
                            <input className='number-format' />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

function Linha() {
    return (
        <tr>
            <td>
                <input type='text' className='number-format' />
            </td>
            <td>
                <input type='text' />
            </td>
            <td>
                <input type='text' className='number-format' />
            </td>
            <td>
                <input type='text' className='number-format' />
            </td>
        </tr>
    );
}

export default Recibo;
