import { SERVER_URL } from '@myConstants/index';
import { fetchData, formatResonse } from '@myUtils/fetchData';
import { ProjectType } from './type';

class ProjectService {
  private readonly url = SERVER_URL + '/project';

  async getAllProjects() {
    try {
      const res = await fetchData<ProjectType[]>('GET', {
        url: this.url + '/all',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return formatResonse<ProjectType[]>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<ProjectType[]>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async deleteProject(id: string) {
    try {
      const res = await fetchData<ProjectType, { id: string }>(
        'POST',
        {
          url: this.url + '/delete',
          headers: {
            'Content-Type': 'application/json'
          }
        },
        {
          id
        }
      );
      return formatResonse<ProjectType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<ProjectType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async addProject(project: ProjectType) {
    try {
      const res = await fetchData<ProjectType, ProjectType>(
        'POST',
        {
          url: this.url + '/add',
          headers: {
            'Content-Type': 'application/json'
          }
        },
        project
      );
      return formatResonse<ProjectType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<ProjectType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async updateProject(project: ProjectType) {
    try {
      const res = await fetchData<ProjectType, ProjectType>(
        'POST',
        {
          url: this.url + '/update',
          headers: {
            'Content-Type': 'application/json'
          }
        },
        project
      );
      return formatResonse<ProjectType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<ProjectType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }
}

export default new ProjectService();
