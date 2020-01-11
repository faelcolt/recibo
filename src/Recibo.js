import React from 'react';
import './Recibo.css';

function Recibo() {
    return (
        <>
            <input type='file' name='imagem' />

            <label for='nome'>Cliente</label>
            <input type='text' name='nome' id='nome' />

            <label for='endereço'>Endereço</label>
            <input type='text' name='endereço' id='endereço' />

            <label for='telefone'>Telefone:</label>
            <input type='tel' name='telefone' id='telefone' />

            <input type='date' name='data' id='data' />

            <table>
                <thead>
                    <tr>
                        <th>Quantidade</th>
                        <th>Descrição</th>
                        <th>Valor Unitário</th>
                        <th>Valor Total</th>
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
                        <td></td>
                        <td></td>
                        <td>Total Geral</td>
                        <td>
                            <input />
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
                <input type='text' />
            </td>
            <td>
                <input type='text' />
            </td>
            <td>
                <input type='text' />
            </td>
            <td>
                <input type='text' />
            </td>
        </tr>
    );
}

export default Recibo;
