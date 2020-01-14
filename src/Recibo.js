import React from 'react';
import './Recibo.css';
import cabeçalho from './images/cabecalho.jpeg';

function Recibo() {
    const data = new Date();
    const ano = data.getFullYear();
    const mes = data.getMonth() + 1;
    const dia = data.getDate();
    const hoje = `${ano}-${mes < 10 ? '0' + mes : mes}-${
        dia < 10 ? '0' + dia : dia
    }`;

    console.log(hoje);

    return (
        <>
            <input type='file' name='imagem' style={{ display: 'none' }} />

            <div style={{ width: '100%' }}>
                <img
                    style={{ width: '100%' }}
                    src={cabeçalho}
                    alt='Imagem do Cabeçalho'
                />
            </div>

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
                    style={{ flex: 1 }}
                />

                <input type='date' name='data' id='data' defaultValue={hoje} />
            </div>

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
        </>
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
