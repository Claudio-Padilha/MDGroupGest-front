import { useMemo } from "react";
import request from '../components/Form/request';

const useOfficesActions = () => {

  const officesRequest = request.getOffices();

  return officesRequest;
}

const useOffices = () => {
  useOfficesActions()
  const officesList = JSON.parse(localStorage.getItem('offices'));

  return officesList;
}

export { useOfficesActions, useOffices };