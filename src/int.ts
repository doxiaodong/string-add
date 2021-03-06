export function addInt(a: string, b: string, maxLength = 15, remainZero = false) {
  let aIsNegative = a[0] === '-'
  let bIsNegative = b[0] === '-'

  const bothNegative = aIsNegative && bIsNegative
  let retIsNegative = bothNegative
  if (aIsNegative) {
    a = a.slice(1)
  }
  if (bIsNegative) {
    b = b.slice(1)
  }

  if (bothNegative) {
    aIsNegative = false
    bIsNegative = false
  }

  return removeUnuseZero(add(a, b), retIsNegative, remainZero)

  function add(pa, pb, ret = '', nextAdd = 0): string {
    const lenA = pa.length
    const lenB = pb.length

    const ia = pa.slice(-maxLength, lenA)
    const ib = pb.slice(-maxLength, lenB)
    const len = Math.max(ia.length, ib.length)
    const one = Math.pow(10, len)

    let iab = (aIsNegative ? -ia : +ia) + (bIsNegative ? -ib : +ib) + nextAdd

    nextAdd = 0

    if (iab >= one) {
      nextAdd = 1
      iab -= one
    }

    if (iab >= 0) {
      iab = iab + one
      iab = (iab + '').slice(1) as any // special iab string
    }

    const nextA = pa.slice(0, -maxLength)
    const nextB = pb.slice(0, -maxLength)
    const shouldContinue = nextA.length > 0 || nextB.length > 0

    if (iab < 0) {
      let iabString = ''
      nextAdd = -1
      iab += one
      iabString = iab + ''
      // 补充 -923 + 1000 = 077 被删掉的 0
      while (iabString.length < len) {
        iabString = '0' + iabString
      }
      iab = iabString as any
    }

    ret = iab + ret

    if (shouldContinue) {
      return add(nextA, nextB, ret, nextAdd)
    }

    // 处理相加后 nextAdd 为 1 的情况
    if (nextAdd === 1) {
      ret = '1' + ret
    }

    // 处理相加后 nextAdd 为 -1 的情况
    // 对应规则为 19920122 -> 80079878
    // 670 -> 330
    // 077 -> 923
    if (nextAdd === -1) {
      retIsNegative = true

      let checkRet = ''
      const l = ret.length

      // 移除末尾的 0 再处理
      const retRemoveSuffixZero = ret.replace(/0+$/, '')
      const ll = retRemoveSuffixZero.length

      if (ll > 1) {
        for (let i = 0; i < ll - 1; i++) {
          checkRet += 9 - +ret[i]
        }
      }
      checkRet += 10 - +retRemoveSuffixZero[ll - 1]

      const zeros = l - ll
      // 添加刚刚被移除的 0
      for (let i = 0; i < zeros; i++) {
        checkRet += '0'
      }

      ret = checkRet
    }
    return ret
  }
}

function removeUnuseZero(str: string, addNegative: boolean, remainZero: boolean): string {
  let ret = str
  if (!remainZero) {
    ret = ret.replace(/^0+/, '')
    if (ret === '') {
      ret = '0'
    }
  }

  if (addNegative && ret !== '0') {
    ret = '-' + ret
  }
  return ret
}
