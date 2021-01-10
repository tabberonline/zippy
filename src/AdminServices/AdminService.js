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
  }
  // forgotPassword: async (data) => {
  //   return  DataService.post(`/auth/forgot_password`,data);
  // },

  // sendOtp: async (data) => {
  //   return  DataService.post(`/user/sendotp`,data);

  // },


  // getHomeBlockDiscover: async () => {
  //   return DataService.post('/block/home')
  // },



  //   getSellers: async () => {
  //     return DataService.get('/user/all');
  //   },
  //   getUsers: async () => {
  //     return DataService.get('/user/all');
  //   },

  //   postRegistration: async (data) => {

  //     return DataService.post('/auth/signup', data);
  //     // return await axios.post(`/Auth/userregistration`, data);
  //   },
  
  //   getRegistration: async () => {
  //     return  DataService.get(`/auth/signup`);
  //   },
  
  //   postUserLogin: async (data) => {
  //     return DataService.post('/auth/login', data);
  //   },
  //   postEmailValidation: async (data) => {
  //     return DataService.post('/auth/user_check', data);
  //   },
  //   getUserDataById: async (id) => {
  //     return DataService.get('/user/'+id,);

  //   },

  //   updateUser: async (id,data) => {
  //     return DataService.put('/user/'+id,data);
  //   },
    
  //   getCommunity: async () => {
  //     return DataService.get('/community');
  //   },
  //   addCommunity: async (data) => {
  //     return DataService.post('/community',data);
  //   },
  //   getPageData: async () => {
  //     return DataService.get('/page');
  //   },
  //   addPage: async (data) => {
  //     return DataService.post('/page',data);
  //   },
  //   updateSellerStatus: async (data,id) => {
  //     return DataService.put('/user/'+id,data);
  //   },
  //   updateCommunityStatus: async (data,id) => {
  //     return DataService.put('/Community/'+id,data);
  //   },
  //   updateCommunity: async (data,id) => {
  //     return DataService.put('/Community/'+id,data);
  //   },
  //   editPage: async (data,id) => {
  //     return DataService.put('/page/'+id,data);
  //   },
  //   deletePermanent: async (id,type) => {
  //     return DataService.delete('/deleteper/'+type+'/'+id);
  //   },
  //   getAttribute: async () => {
  //     return DataService.post('/attribute/attributelist',{status: 1});
  //   },
  //   addAttribute: async (data) => {
  //     return DataService.post('/attribute',data);
  //   },
  //   updateAttribute: async (data,id) => {
  //     return DataService.put('/attribute/'+id,data);
  //   },
  //   addAttributeOption: async (data) => {
  //     return DataService.post('/attributeoption',data);
  //   },
  //   getAttributeOptionList: async () => {
  //     return DataService.post('/attributeoption/list');
  //   },
  //   updateAttributeOption: async (data,id) => {
  //     return DataService.put('/attributeoption/'+id,data);
  //   },
  //   getAttributeStyle: async () => {
  //     return DataService.post('/style/list',{status: 1,style_type: 1})
  //   },
  //   addAttributeStyle: async (data) => {
  //     return DataService.post('/style',data)
  //   },
  //   updateAttributeStyle: async (data,id) => {
  //     return DataService.put('/style/'+id,data)
  //   },
  //   addCategory: async (data) => {
  //     return DataService.post('/category',data)
  //   },
  //   addSubCategory: async (data) => {
  //     return DataService.post('/subcategory',data)
  //   },
  //   getCategoryById: async (id) => {
  //     return DataService.get('/category/'+id)
  //   },
  //   getCategoryList: async (data) => {
  //     return DataService.post('/category/categorylist',data)
  //   },
  //   getCategoryListById: async (id) => {
  //     return DataService.get('/category/'+id)
  //   },
  //   getSubCategoryList: async (data) => {
  //     return DataService.post('/category/getCategoryTreeById',data)
  //   },
  //   updateCategory: async (data,id) => {
  //     return DataService.put('/category/'+id,data)
  //   },
  //   getPolicy: async () => {
  //     return DataService.post('/policy/list')
  //   },
  //   addPolicy: async (data) => {
  //     return DataService.post('/policy',data)
  //   },
  //   updatePolicy: async (data,id) => {
  //     return DataService.put('/policy/'+id,data)
  //   },
  //   getBlock: async () => {
  //     return DataService.get('/block')
  //   },
  //   addBlock: async (data) => {
  //     return DataService.post('/block',data)
  //   },
  //   updateBlock: async (data,id) => {
  //     return DataService.put('/block/'+id,data)
  //   },

  //   getBanner: async () => {
  //     return DataService.post('/banner/list',{status: 1})
  //   },
  //   addBanner: async (data) => {
  //     return DataService.post('/banner',data)
  //   },

  //   addBlog: async(data) => {
  //     return DataService.post('/blog/',data)
  //   },
  //   Bloglist: async (data) => {
  //     return DataService.post('/blog/list?limit=0&page=1', data)
  //   },
  //   getBlog: async(id) => {
  //     return DataService.post('/blog/'+id)
  //   },
  //   updateBlog: async (data,id) => {
  //     return DataService.put('/blog/'+id,data)
  //   },
  //   shareBlog: async(id) => {
  //     return DataService.get('/blog/share/'+id)
  //   },
  //   likeBlog: async(data) => {
  //     return DataService.post('/like/addlike', data)
  //   },
  //   BlogbySlug :async(id) => {
  //     return DataService.get('/blog/slug/dep_life', id)
  //   },

  //   Commentlist: async(data) => {
  //     return DataService.post('/comment/listing', data)
  //   },
  //   addComment: async(data) => {
  //     return DataService.post('/comment/addcomment', data)
  //   },
  //   updateComment: async(data) => {
  //     return DataService.post('/comment/update', data)
  //   },

  //   addProduct: async (data) => {
  //     return DataService.post('/product/addproduct',data)
  //   },
  //   getProduct: async () => {
  //     return DataService.post('/product/productlist',)
  //   },
}