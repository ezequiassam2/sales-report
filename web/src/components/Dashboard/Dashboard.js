import React from 'react';
import CollapsibleTable from "./CollapsibleTable";

export default function Dashboard() {
    function createData(product, total) {
        return {
            product,
            total,
            transactions: [
                {
                    date: '2020-01-05',
                    type: 'Venda',
                    vendor: 'Jose',
                    value: 2.4,
                },
                {
                    date: '2020-01-02',
                    type: 'Comissão',
                    vendor: 'Maria',
                    value: 87.4,
                },
            ],
        };
    }


    const rows = [
        createData('Frozen yoghurt', 159),
        createData('Ice cream sandwich', 237),
        createData('Eclair', 262),
        createData('Cupcake', 305),
        createData('Gingerbread', 356),
    ];

    return <>
        <h2>Dashboard</h2>
        <CollapsibleTable data={rows}/>
    </>
}