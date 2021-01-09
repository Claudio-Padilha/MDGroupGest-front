import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';


// Create Document Component
const ContractDocumentPDF = ({employeeName, employeeNif, employeeAddress}) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        2020
      </Text>
      <Text style={styles.title}>CONTRATO DE PRESTAÇÃO DE SERVIÇOS</Text>
     
      <Text style={styles.text}>
        FENIXTHOUSAND SOLUTIONS LDA., sociedade com sede na Rua Ricardo Reis, nº 2, 6º esq, 2675-237 Odivelas, 
        com o NIPC 514216131, matriculada na Conservatória do Registo Comercial de Lisboa, sob o mesmo número, 
        neste ato representada na forma de seus atos constitutivos, adiante designada “Fenixthousand Solutions, Lda.” ou “Contratante”; e 
      </Text>

      <Text style={styles.text}>
        {employeeName}, portador(a) do Cartão de Cidadão com o número de identificação civil NR , emitido por República Portuguesa
        e válido até (VALIDADE), número de identificação fiscal {employeeNif} , com residência habitual na {employeeAddress}, adiante designado como “Contratado”;
      </Text>
      <Text style={styles.text}>Sendo Contratante e Contratado, em conjunto, doravante denominados simplesmente “Partes”;</Text>
      
      <Text style={styles.subtitle} break>
        Considerando que: 
      </Text>

      <Text style={styles.text}>
        (i) a Contratante tem por objeto social o exercício da atividade de venda de mercadorias; 
        angariação de novos clientes e serviços; e prestação de serviços de divulgação comercial;
      </Text>

      <Text style={styles.text}>
        (ii) A Contratante tem interesse em contratar os serviços do Contratado e que este aceita prestar, 
        em regime de exclusividade, os seus serviços profissionais no sentido de colaborar para o desenvolvimento 
        da atividade da Fenixthousand Solutions, Lda.
      </Text>

      <Text style={styles.text}>
        Resolvem as Partes, de comum acordo, celebrar o presente Contrato de Prestação de Serviços (“Contrato”),
        o qual se regerá de acordo com os seguintes termos e condições:
      </Text>

      <Text style={styles.subtitle} break>
        Cláusula Primeira - Objeto 
      </Text>

      {/* first clause */}
      <Text style={styles.clauseTextFirstLine}>1.      O presente Contrato tem por objeto a prestação de serviços pelo Contratado à Contratante, em regime</Text>
      <Text style={styles.clauseText}>
        de exclusividade, nomeadamente, (i) o desenvolvimento de tarefas necessárias à preparação 
        e ao cumprimento dos contratos de venda de mercadorias e de angariação de novos clientes e serviços; 
        e (ii) a prestação de serviços de divulgação comercial; tudo de forma autônoma e independente, não 
        sujeita à autoridade ou direção da Fenixthousand Solutions, Lda (“Serviços”); 
      </Text>

      <Text style={styles.clauseTextFirstLine}>1.2     A Contratante e o Contratado acordam que, pelo facto de serem entidades juridicamente autónomas</Text>
      <Text style={styles.clauseText}>
        e não existir qualquer relação de trabalho que não seja a de prestação de serviços, o Contratado é o único e exclusivo responsável pelos pagamentos e contribuições 
        relativas a impostos, segurança social, seguros de acidentes de trabalho ou outras importâncias devidas e inerentes a sua atividade de profissional liberal 
        (ou empresário em nome individual), salvo disposições legais em contrário.
      </Text>

      {/* second clause */}
      <Text style={styles.subtitle} break>
        Cláusula Segunda - Local
      </Text>)

      <Text style={styles.text}>
        O Contratado desenvolverá seus serviços em território português, sendo da essência deste Contrato a necessidade de deslocamento 
        em viagens para o desenvolvimento pleno dos Serviços. Tais viagens correrão, exclusivamente, às expensas do Contratado.
      </Text>

      {/* third clause */}
      {/* <Text style={styles.clauseTextFirstLine}>3.      As despesas incorridas pelo Contratado na execução dos serviços, tais como passagens, estadia e alimentação em</Text>
      <Text style={styles.clauseText}>
        viagens, são de exclusiva responsabilidade do Contratado e, via de regra, não serão antecipadas ou reembolsadas pela Contratante. 
      </Text>

      <Text style={styles.clauseTextFirstLine}>3.1     Em contrapartida aos serviços prestados, a A Fenixthousand Solutions, Lda deverá ao Contratado valor</Text>
      <Text style={styles.clauseText}>
        de exclusividade, nomeadamente, (i) o desenvolvimento de tarefas necessárias à preparação 
        e ao cumprimento dos contratos de venda de mercadorias e de angariação de novos clientes e serviços; 
        e (ii) a prestação de serviços de divulgação comercial; tudo de forma autônoma e independente, não 
        sujeita à autoridade ou direção da Fenixthousand Solutions, Lda (“Serviços”); 
      </Text>

      <Text style={styles.clauseTextFirstLine}>3.3    O valor devido pela prestação dos Serviços acima será pago ao</Text>
      <Text style={styles.clauseText}>
        Contratado em até 5 (cinco) dias a contar da data em que ocorrer a boa cobrança pela Contratante 
        dos serviços prestados pelo Contratado, o que costuma ocorrer até o dia 12 de cada mês. 
      </Text> */}

      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    margin: 12,
  },
  text: {
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 6,
    marginTop: 6,
    fontSize: 12,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },

  clauseTextFirstLine: {
    marginLeft: 12,
    marginRight: 6,
    marginBottom: -6,
    marginTop: 8,
    fontSize: 12,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },

  clauseText: {
    marginLeft: 42,
    marginRight: 12,
    marginBottom: 6,
    marginTop: 6,
    fontSize: 12,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});


export default ContractDocumentPDF;