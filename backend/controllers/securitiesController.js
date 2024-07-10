const db = require('../config/db');
const moment = require('moment');

exports.fetchSecurityTransactions = async (req, res) => {
  const { page, sortField, sortOrder, search, fromDate, toDate, portfolioNumber, shareSymbol, securityCurrency } = req.query;

  
  // const page = 1;
  const pageSize = 10;
  // const sortField = 'TRADE_DATE';
  // const sortOrder = 'ASC';
  // const search = '';
  const filters = {};

  const offset = (page - 1) * pageSize;

  const whereConditions = [];
  if (search) {
    whereConditions.push(`
      (ST.SECURITY_ACCOUNT LIKE '%${search}%' OR
       SAM.ACCOUNT_NAME LIKE '%${search}%' OR
       ST.SECURITY_NUMBER LIKE '%${search}%' OR
       SM.SHORT_NAME LIKE '%${search}%')
    `);
  }

  for (const [field, value] of Object.entries(filters)) {
    if (Array.isArray(value)) {
      whereConditions.push(`${field} IN (${value.map(v => `'${v}'`).join(', ')})`);
    } else {
      whereConditions.push(`${field} = '${value}'`);
    }
  }

  if(fromDate && toDate) {
    startDate = moment(fromDate, 'YYYY-MM-DD').format('DD/MM/YYYY');
    endtDate = moment(toDate, 'YYYY-MM-DD').format('DD/MM/YYYY');

    const date_query = `(STR_TO_DATE(ST.TRADE_DATE, '%d/%m/%Y') BETWEEN STR_TO_DATE('${startDate}', '%d/%m/%Y') AND STR_TO_DATE('${endtDate}', '%d/%m/%Y'))`
    whereConditions.push(date_query);
  }

  if(portfolioNumber) 
    whereConditions.push(`ST.SECURITY_ACCOUNT = '${portfolioNumber}'`);

  if(shareSymbol) 
    whereConditions.push(`ST.SECURITY_NUMBER = '${shareSymbol}'`);

  if(securityCurrency) 
    whereConditions.push(`ST.SECURITY_CURRENCY = '${securityCurrency}'`);

  let whereClause = whereConditions.length ? `WHERE ${whereConditions.join(' AND ')}` : '';

  const dataQuery = `
    SELECT ST.TRADE_DATE, ST.SECURITY_ACCOUNT, SAM.ACCOUNT_NAME, ST.SECURITY_NUMBER, SM.SHORT_NAME, ST.TRANS_TYPE, ST.RECID, ST.NO_NOMINAL, ST.PRICE, ST.NET_AMT_TRADE, ST.BROKER_COMMS, ST.PROF_LOSS_SEC_CCY
    FROM security_transactions AS ST
    LEFT JOIN security_master AS SM ON ST.SECURITY_NUMBER = SM.YSM_ID
    LEFT JOIN sec_acc_master AS SAM ON ST.SECURITY_ACCOUNT = SAM.RECID
    ${whereClause}
    ORDER BY STR_TO_DATE(ST.TRADE_DATE, '%d/%m/%Y') ASC
    LIMIT ${pageSize} OFFSET ${offset}
  `;
    // ORDER BY ${sortField} ${sortOrder}

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM security_transactions AS ST
    LEFT JOIN security_master AS SM ON ST.SECURITY_NUMBER = SM.YSM_ID
    LEFT JOIN sec_acc_master AS SAM ON ST.SECURITY_ACCOUNT = SAM.RECID
    ${whereClause}
  `;

  try {
    const [data] = await db.query(dataQuery);
    const [countResult] = await db.query(countQuery);
    const total = countResult[0].total;

    res.json({transactions: data, total: total});
  } catch (error) {
    console.error('Error executing query:', error);
  }
}