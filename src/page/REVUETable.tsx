import React, { Component }  from 'react';
import { default as JsonData } from '../data/CuriousCasesList.json';

function JsonDataDisplay() {
    const DisplayData = JsonData.map((info) => {
        return (
            <tr>
                <td>{info.hugoGeneSymbol}</td>
                <td>{info.genomicLocation}</td>
                <td>{info.comment}</td>
            </tr>
        );
    });

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Gene</th>
                        <th>Genomic Location</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>{DisplayData}</tbody>
            </table>
        </div>
    );
}

export default JsonDataDisplay;
