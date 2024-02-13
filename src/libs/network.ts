import { parse } from "cookie";
import { instance } from "./axios";
import { CreateCard } from "@/types/DashboardType";

const getAccessToken = () => {
	if(typeof window !== 'object') return;
	const cookies = parse(document.cookie);
  const accessToken = cookies.accessToken;
  return accessToken;
}

export const getHeader = () => {
  return {
    'Authorization': `Bearer ${getAccessToken()}`,
    'Content-Type': 'application/json'
  }
}

export const postDashboard = async ({title, color}:{title:string, color:string}) => {
  try{
    const response = await instance.post('/dashboards', {title, color}, {headers:getHeader()})
    return response.data;
  } catch (error) {
    alert(error)
  }
};

export const getDashboard = async(pageNumber:number) => {
  try {
    const response = await instance.get('/dashboards', {
      params: {
        navigationMethod: 'pagination',
        page: pageNumber
      }, 
      headers:getHeader()
    });
    return response.data;
  } catch (error) {
    alert(error);
  }
};

export const getDetailedDashboardData = async(id:string) => {
  try {
    const response = await instance.get(`/dashboards/${Number(id)}`, {
      headers:getHeader()
    });
    return response;
  } catch (error) {
    alert(error);
  }
};

export const getColumns = async(id:string) => {
  try {
    const response = await instance.get('/columns', {
      params: {
        dashboardId: Number(id)
      }, 
      headers:getHeader()
    });
    return response.data;
  } catch (error) {
    alert(error);
  }
};

export const putColumn = async(columnId:number, title:string) => {
  const data = {
    'title': title
  };
  try{
    const response = await instance.put(`/columns/${columnId}`, data, {
      headers:getHeader()
    })
    return response.data;
  } catch(error){
    alert(error)
  }
};

export const postCard = async(data:CreateCard) => {
  try{
    const response = await instance.post('/cards', data, {
      headers:getHeader()
    });
    return response;
  } catch(error) {
    alert(error)
  }
}

export const getCard = async(id:number) => {
  try{
    const response = await instance.get('/cards', {
      params: {
        columnId:id
      },
      headers:getHeader()
    })
    return response;
  } catch (error) {
    alert(error)
  }
};

export const getMoreCard = async(id:number, cursor:number) => {
  try{
    const response = await instance.get('/cards', {
      params: {
        columnId:id,
        cursorId:cursor
      },
      headers:getHeader()
    })
    return response;
  } catch (error) {
    alert(error)
  }
}

export const deleteCard = async(cardId:number) => {
  try{
    const response = await instance.delete(`/cards/${cardId}`, {
      headers:getHeader()
    })
    return response;
  } catch(error) {
    alert(error);
  }
}

export const deleteColumn = async(columnId:number) => {
  try{
    const response = await instance.delete(`/columns/${columnId}`,{
      headers:getHeader()
    });
    return response;
  } catch(error) {
    alert(error);
  }
}
