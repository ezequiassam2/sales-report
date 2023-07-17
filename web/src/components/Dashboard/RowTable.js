import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function RowTable(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);

    const getType = (param) => {
        switch (param) {
            case 1:
                return 'Venda produtor'
            case 2:
                return 'Venda afiliado'
            case 3:
                return 'Comissão paga'
            case 4:
                return 'Comissão recebida'
            default:
                return param
        }
    }

    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="center">{row.total}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Transactions
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell align="center">Vendor</TableCell>
                                        <TableCell align="center">Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.transactions.map((transactionRow) => (
                                        <TableRow key={transactionRow.date}>
                                            <TableCell component="th" scope="row">
                                                {transactionRow.date}
                                            </TableCell>
                                            <TableCell>{getType(transactionRow.type)}</TableCell>
                                            <TableCell align="center">{transactionRow.vendor}</TableCell>
                                            <TableCell align="center">{transactionRow.type !== 3 ? '+' : '-'} ${transactionRow.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

RowTable.propTypes = {
    row: PropTypes.shape({
        transactions: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.number.isRequired,
                vendor: PropTypes.number.isRequired,
                type: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        product: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
    }).isRequired,
};