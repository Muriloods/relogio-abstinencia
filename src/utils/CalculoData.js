class CalculoData {
  calculaData (dataInicio, dataAtual) {
    var data = dataInicio.split('/')
    var ano = data[2]
    var mes = data[1]
    var dia = data[0]

    var dataAtu = dataAtual.split('/')
    var anoAtual = dataAtu[2]
    var mesAtual = dataAtu[1]
    var diaAtual = dataAtu[0]

    if (anoAtual >= ano) {
      if (mesAtual >= mes) {
        if (diaAtual >= dia) {
          var idade = anoAtual - ano
          var idadeMes = mesAtual - mes
          var idadeDia = diaAtual - dia
          return {
            anos: idade,
            meses: idadeMes,
            dias: idadeDia
          }
        } else {
          if (mesAtual > mes) {
            idade = anoAtual - ano
            idadeMes = mesAtual - mes
            idadeMes--
            idadeDia = diaAtual - dia
            if (mesAtual === 1) {
              idadeDia += this.calculaDiasMes(12, anoAtual)
            } else {
              idadeDia += this.calculaDiasMes(mesAtual - 1, anoAtual)
            }
            return {
              anos: idade,
              meses: idadeMes,
              dias: idadeDia
            }
          } else {
            if (anoAtual > ano) {
              idade = anoAtual - ano
              idade--
              idadeMes = mesAtual - mes
              idadeMes += 12 - 1
              idadeDia = diaAtual - dia
              if (mesAtual === 1) {
                idadeDia += this.calculaDiasMes(12, anoAtual)
              } else {
                idadeDia += this.calculaDiasMes(mesAtual - 1, anoAtual)
              }
              return {
                anos: idade,
                meses: idadeMes,
                dias: idadeDia
              }
            }
          }
        }
      } else {
        if (anoAtual > ano) {
          if (diaAtual >= dia) {
            idade = anoAtual - ano
            idade--
            idadeMes = mesAtual - mes
            idadeMes += 12
            idadeDia = diaAtual - dia
            return {
              anos: idade,
              meses: idadeMes,
              dias: idadeDia
            }
          } else {
            idade = anoAtual - ano
            idade--
            idadeMes = mesAtual - mes
            idadeMes += 12 - 1
            idadeDia = diaAtual - dia
            if (mesAtual === 1) {
              idadeDia += this.calculaDiasMes(12, anoAtual)
            } else {
              idadeDia += this.calculaDiasMes(mesAtual - 1, anoAtual)
            }
            return {
              anos: idade,
              meses: idadeMes,
              dias: idadeDia
            }
          }
        }
      }
    }
  }
  // eslint-disable-next-line lines-between-class-members
  calculaDiasMes (mesRecente, anoRecente) {
    if (mesRecente === 2) {
      if ((anoRecente % 4) === 0) {
        return 29
      } else {
        return 28
      }
    }
    // eslint-disable-next-line no-constant-condition
    if ((mesRecente = 1) || (mesRecente = 3) || (mesRecente = 5) || (mesRecente = 7) || (mesRecente = 8) || (mesRecente = 10) || (mesRecente = 12)) {
      return 31
    }
    // eslint-disable-next-line no-constant-condition
    if ((mesRecente = 4) || (mesRecente = 6) || (mesRecente = 9) || (mesRecente = 11)) {
      return 30
    }
  }
}

const calculoData = new CalculoData()
export { calculoData }
