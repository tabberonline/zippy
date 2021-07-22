/* eslint-disable import/no-anonymous-default-export */
import { DataService } from './dataService';

export default {

  createPortfolio : async (data) => {
    return DataService.post('/portfolio/create', data);
  },
  updatePortfolio: async (data) => {
    return DataService.put('/portfolio/update', data);
  },
  getUserData: async () => {
    return DataService.get('/user/resume');
  },
  createRankWidget: async (data) => {
    return DataService.post('/rankwidget/create', data);
  },
  deleteRankWidget: async (data) => {
    return DataService.delete(`/rankwidget/delete?website_id=${data}`);
  },
  updateRankWidget: async (data) => {
    return DataService.put('/rankwidget/update', data);
  },
  createContestWidget: async (data) => {
    return DataService.post('/contestwidget/create', data);
  },
  deleteContestWidget: async (id) => {
    return DataService.delete(`/contestwidget/delete?id=${id}`);
  },
  updateContestWidget: async (id, data) => {
    return DataService.put(`/contestwidget/update?id=${id}`, data);
  },
  createProjectWidget: async (data) => {
    return DataService.post('/personalproject/create', data);
  },
  deleteProjectWidget: async (id) => {
    return DataService.delete(`/personalproject/delete?id=${id}`);
  },
  updateProjectWidget: async (id, data) => {
    return DataService.put(`/personalproject/update?id=${id}`, data);
  },
  getUserDataById: async(id) => {
    return DataService.get(`/user/resume?id=${id}`);
  },
  sendMail: async (data) => {
    return DataService.post('/email', data);
  },
  sendMailwithAttachment: async (email, data, optionalHeader) => {
    return DataService.post(`/share/email?email_to=${email}`, data, optionalHeader)
  },
  AttachResume: async (link) => {
    return DataService.post(`/portfolio/upload/crlink?cloud_link=${link}`)
  },
  SocialProfiles: async (data) => {
    return DataService.post('/socialwebsite/create', data)
  },
  UpdateSocialProfiles: async (data) => {
    return DataService.put('/socialwebsite/update', data)
  },
  SentHistory: async (page, items) => {
    return DataService.get(`/email/history?page_no=${page}&items_per_page=${items}`)
  },
  UpdateName: async (name) =>{
    return DataService.get(`/user/update/user_name?userName=${name}`)
  }
}