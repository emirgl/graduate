const convertTime = (blockTimeStamp) => {
    const jsDate = new Date(Number(blockTimeStamp) * 1000);
    return jsDate.toLocaleString()
   }
module.exports = convertTime