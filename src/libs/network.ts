import { instance } from "./axios";
import LocalStorage from "./localstorage";

const token = LocalStorage.getItem('accessToken');

const header = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
}

export const postDashboard = async () => {
  const data = {
    title: 'test1',
    color: '#7AC555'
  };

  try{
    const response = await instance.post('/dashboards', data, {headers:header})
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
      headers: header
    });
    return response.data;
  } catch (error) {
    alert(error);
  }
};

export const getDetailedDashboardData = async(id:string) => {
  try {
    const response = await instance.get(`/dashboards/${Number(id)}`, {
      headers: header
    });
    return response;
  } catch (error) {
    alert(error);
  }
};

export const postColumn = async() => {
  const data = {
    title: 'To Do',
    dashboardId: 2930
  };

  try{
    const response = await instance.post('/columns', data, {headers:header})
    return response.data;
  } catch (error) {
    alert(error)
  }
};

export const getColumns = async(id:string) => {
  try {
    const response = await instance.get('/columns', {
      params: {
        dashboardId: Number(id)
      }, 
      headers: header
    });
    return response.data;
  } catch (error) {
    alert(error);
  }
};

export const postCard = async() => {
  const data = {
    "assigneeUserId": 798,
    "dashboardId": 2930,
    "columnId": 9712,
    "title": "할일 테스트 1",
    "description": "테스트용 첫번째 생성 할일",
    "dueDate": "2024-02-29 23:59",
    "tags": [
      '백엔드', '상', '프로젝트'
    ],
    "imageUrl": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fdiscover%2Ffree-nature-images&psig=AOvVaw3AH_D_gLtr8YjP2dHK1REv&ust=1707143375910000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKjRvpLzkYQDFQAAAAAdAAAAABAD"
  }

  try{
    const response = await instance.post('/cards', data, {headers:header})
    return response.data;
  } catch (error) {
    alert(error)
  }
};
export const getCard = async(id:number) => {
  try{
    const response = await instance.get('/cards', {
      params: {
        columnId:id
      },
      headers:header
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
      headers:header
    })
    return response;
  } catch (error) {
    alert(error)
  }
}

export const deleteCard = async(cardId:number) => {
  try{
    const response = await instance.delete(`/cards/${cardId}`, {
      headers:header
    })
    return response;
  } catch(error) {
    alert(error);
  }
}
