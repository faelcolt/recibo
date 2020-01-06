import React from 'react';
import './Recibo.css';

function Recibo() {
  return (
    <>
    <label for='nome'>Cliente</label>
    <input type='text' name='nome' id='nome'/>

    <label for='endereço'>Endereço</label>
    <input type='text' name='endereço' id='endereço'/>

    <label for='telefone'>Telefone:</label>
    <input type='tel' name='telefone' id='telefone'/>

    <input type='date' name='data' id='data'/>

    <table>
      <thead>
        <tr>
          <th>Qtd.</th>
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
        <td></td>
        <td></td>
        <td>Total</td>
        <td>R$ 190,00</td>
      </tfoot>
    </table>
    </>
  );
}

function Linha() {
  return (
    <tr>
      <td>50</td>
      <td>Lixadeira Vonder 750W 220V</td>
      <td>R$ 190,00</td>
      <td>R$ 190,00</td>
    </tr>
  );
}

export default Recibo;
