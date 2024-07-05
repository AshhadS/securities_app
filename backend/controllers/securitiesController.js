const { Sequelize } = require('sequelize');
const db = require('../config/db');


exports.fetchSecurityTransactions = async (req, res) => {
    const {
      page = 1,
      pageSize = 10,
      sortField = 'TRADE_DATE',
      sortOrder = 'ASC',
      search = '',
      filters = {},
    } = options;
  
    // Build the WHERE clause based on filters and search
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
  
    const whereClause = whereConditions.length ? `WHERE ${whereConditions.join(' AND ')}` : '';
  
    // Calculate offset for pagination
    const offset = (page - 1) * pageSize;
  
    const query = `
      SELECT ST.TRADE_DATE, ST.SECURITY_ACCOUNT, SAM.ACCOUNT_NAME, ST.SECURITY_NUMBER, SM.SHORT_NAME, ST.TRANS_TYPE, ST.RECID, ST.NO_NOMINAL, ST.PRICE, ST.NET_AMT_TRADE, ST.BROKER_COMMS, ST.PROF_LOSS_SEC_CCY
      FROM security_transactions AS ST
      LEFT JOIN security_master AS SM ON ST.SECURITY_NUMBER = SM.YSM_ID
      LEFT JOIN sec_acc_master AS SAM ON ST.SECURITY_ACCOUNT = SAM.RECID
      ${whereClause}
      ORDER BY ${sortField} ${sortOrder}
      LIMIT ${pageSize} OFFSET ${offset}
    `;
  
    try {
      const [results, metadata] = await sequelize.query(query);
      console.log(results);
      return results;
    } catch (error) {
      console.error('Error executing query:', error);
    }
}