const getItem = key => {
  const data = typeof window !== 'undefined' ? localStorage.getItem(key) : '';

  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

const setItem = (key, value) => {
  const stringify = typeof value !== 'string' ? JSON.stringify(value) : value;
  return localStorage.setItem(key, stringify);
};

const removeItem = key => {
  localStorage.removeItem(key);
};

var PortalMap = new Map();
PortalMap.set('leetcode', {url: 'https://leetcode.com/', id: '1', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/LeetCode_Logo_black_with_text.svg/1024px-LeetCode_Logo_black_with_text.svg.png'});
PortalMap.set('geeksforgeeks', {url: 'https://www.geeksforgeeks.org', id: '2', logo: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200817185016/gfg_complete_logo_2x-min.png'});
PortalMap.set('hackerrank', {url: 'https://www.hackerrank.com/', id: '3', logo: 'https://i0.wp.com/gradsingames.com/wp-content/uploads/2016/05/856771_668224053197841_1943699009_o.png'});
PortalMap.set('codechef', {url: 'https://www.codechef.com/', id: '4', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Codechef%28new%29_logo.svg/1200px-Codechef%28new%29_logo.svg.png'});
PortalMap.set('topcoder', {url: 'https://www.topcoder.com/', id: '5', logo: 'https://www.topcoder.com/wp-content/uploads/2016/01/topcoder-logo.png'});

var ReversePortalMap = new Map();
ReversePortalMap.set('1', {name: 'LeetCode', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/LeetCode_Logo_black_with_text.svg/1024px-LeetCode_Logo_black_with_text.svg.png'});
ReversePortalMap.set('2', {name: 'Geeks for Geeks', logo: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200817185016/gfg_complete_logo_2x-min.png'});
ReversePortalMap.set('3', {name: 'HackerRank', logo: 'https://i0.wp.com/gradsingames.com/wp-content/uploads/2016/05/856771_668224053197841_1943699009_o.png'});
ReversePortalMap.set('4', {name: 'CodeChef', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Codechef%28new%29_logo.svg/1200px-Codechef%28new%29_logo.svg.png'});
ReversePortalMap.set('5', {name: 'TopCoder', logo: 'https://www.topcoder.com/wp-content/uploads/2016/01/topcoder-logo.png'});


export { getItem, setItem, removeItem, PortalMap, ReversePortalMap };
