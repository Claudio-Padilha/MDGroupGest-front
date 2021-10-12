import React, { useMemo } from 'react'

import { MDCard, MDCardBody } from './md'

import { Heading, SubHeading } from '../../components/Text/text'

import { useAuth } from '../../hooks/employees/auth'

import { ContentContainerForAdmin, OfficesContainer } from './styles'

const AdminBackOfficeContent = () => {

  const { isCEO, isAdministrator } = useAuth()
  
  const offices = useMemo(() => {
    return JSON.parse(localStorage.getItem('offices')) 
  }, [])
  
  const ramMySalary = JSON.parse(localStorage.getItem('myCurrentSalary'))

  const renderOfficeCard = (office, i) => {

    return (
      <MDCard key={i} className={'cardForOffice'}>
        <MDCardBody className={'bodyCardForOffice'}>
          <SubHeading className={'officeName'}>{office?.name}</SubHeading>
          <Heading className={'officeResult'}>{ramMySalary}€</Heading>
        </MDCardBody>
      </MDCard>
    );
  };

  return (
    (isCEO || isAdministrator) ?
      <ContentContainerForAdmin>
        <OfficesContainer>
          { offices?.map((office, i) => {
            return renderOfficeCard(office, i)
          })}
        </OfficesContainer>
      </ContentContainerForAdmin>
    :
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <p>Você precisa ser administrador para ver este ecrã.</p>
    </div>        
  )
}

export default AdminBackOfficeContent