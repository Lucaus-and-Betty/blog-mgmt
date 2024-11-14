import { ProjectType } from './type';
import { Button, Breadcrumb, Table, type TableProps, notification, Modal, Input, Select } from 'antd';
import projectService from './index.service';
import { useEffect, useState } from 'react';

const Projects = () => {
  const [projectData, setProjectData] = useState<ProjectType[]>([]);
  const [isAddModalOpen, setAddIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditIsModalOpen] = useState(false);
  const [addProject, setAddProject] = useState<ProjectType>({
    id: '',
    title: '',
    link: '',
    blow: 'Lucaus'
  });
  const [editProject, setEditProject] = useState<ProjectType | null>(null);

  const columns: TableProps<ProjectType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      ellipsis: true,
      width: 200,
      key: 'id'
    },
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: false,
      key: 'des'
    },
    {
      title: '链接地址',
      dataIndex: 'link',
      key: 'link'
    },
    {
      title: '归属人',
      dataIndex: 'blow',
      width: 180,
      key: 'blow'
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: record => {
        return (
          <div className="table-action">
            <a
              onClick={() => {
                setEditProject(record);
                setEditIsModalOpen(true);
              }}
            >
              编辑
            </a>
            <a
              onClick={() => {
                const res = window.confirm('确定删除吗?');
                if (res) {
                  deleteProject(record.id);
                } else {
                  return;
                }
              }}
            >
              删除
            </a>
          </div>
        );
      }
    }
  ];

  const getAllProject = async () => {
    const res = await projectService.getAllProjects();
    if (res.success) {
      setProjectData(res.data);
    }
  };

  const deleteProject = async (id: string) => {
    const res = await projectService.deleteProject(id);
    if (res.success) {
      getAllProject();
      notification.success({ message: '删除成功' });
    } else {
      notification.error({ message: '删除失败' });
    }
  };

  const addProjectAction = async () => {
    const res = await projectService.addProject(addProject);
    if (res.success) {
      getAllProject();
      handleAddCancel();
      notification.success({ message: '新增成功' });
    } else {
      notification.error({ message: '新增失败' });
    }
    setAddIsModalOpen(false);
  };

  const updateProject = async (project: ProjectType) => {
    const res = await projectService.updateProject(project);
    if (res.success) {
      getAllProject();
      handleEditCancel();
      notification.success({ message: '更新状态成功' });
    } else {
      notification.error({ message: '更新状态失败' });
    }
    setEditIsModalOpen(false);
  };

  const handleADDOk = () => {
    addProjectAction();
  };

  const handleEditOk = () => {
    updateProject(editProject!);
  };

  const handleAddCancel = () => {
    setAddProject({
      id: '',
      title: '',
      link: '',
      blow: 'Lucaus'
    });
    setAddIsModalOpen(false);
  };

  const handleEditCancel = () => {
    setEditProject(null);
    setEditIsModalOpen(false);
  };

  useEffect(() => {
    getAllProject();
  }, []);

  return (
    <div className="info-container">
      <h1>Projects</h1>
      <Breadcrumb
        style={{
          marginBottom: '20px'
        }}
        separator=">"
        items={[{ title: '项目管理' }]}
      />
      <Button
        style={{
          marginBottom: '20px'
        }}
        type="primary"
        onClick={() => setAddIsModalOpen(true)}
      >
        新增
      </Button>
      <Table bordered rowKey={record => record.id} columns={columns} dataSource={projectData} />
      {editProject && (
        <Modal
          title="编辑项目"
          okText="提交新增"
          cancelText="取消新增"
          open={isEditModalOpen}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
        >
          <div className="modal-item">
            <span>blow: </span>
            <Select
              value={editProject.blow}
              onSelect={e => {
                setEditProject({ ...editProject, blow: e });
              }}
            >
              <Select.Option value="Lucaus">Lucaus</Select.Option>
              <Select.Option value="Betty">Betty</Select.Option>
              <Select.Option value="Our">Our</Select.Option>
            </Select>
          </div>
          <div className="modal-item">
            <span>link: </span>
            <Input value={editProject.link} onChange={e => setEditProject({ ...editProject, link: e.target.value })} />
          </div>
          <div className="modal-item">
            <span>title: </span>
            <Input
              value={editProject.title}
              onChange={e => setEditProject({ ...editProject, title: e.target.value })}
            />
          </div>
        </Modal>
      )}
      <Modal
        title="新增项目"
        okText="提交新增"
        cancelText="取消新增"
        open={isAddModalOpen}
        onOk={handleADDOk}
        onCancel={handleAddCancel}
      >
        <div className="modal-item">
          <span>blow: </span>
          <Select
            value={addProject.blow}
            onSelect={e => {
              setAddProject({ ...addProject, blow: e });
            }}
          >
            <Select.Option value="Lucaus">Lucaus</Select.Option>
            <Select.Option value="Betty">Betty</Select.Option>
            <Select.Option value="Our">Our</Select.Option>
          </Select>
        </div>
        <div className="modal-item">
          <span>link: </span>
          <Input value={addProject.link} onChange={e => setAddProject({ ...addProject, link: e.target.value })} />
        </div>
        <div className="modal-item">
          <span>title: </span>
          <Input value={addProject.title} onChange={e => setAddProject({ ...addProject, title: e.target.value })} />
        </div>
      </Modal>
    </div>
  );
};

export { Projects };
