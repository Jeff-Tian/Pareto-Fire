export const processLoan = loan => {
  loan.files = []
  const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  indices.map(i => {
    let f = loan.data[`files_${i}`]
    if (f) {
      loan.files.push(f)
    }
  })
  return loan
}