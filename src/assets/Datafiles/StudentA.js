/* eslint-disable import/no-anonymous-default-export */
import project1 from '../images/StudentA/Rectangle 25.png';
import project2 from '../images/StudentA/Rectangle 26.png';
import project3 from '../images/StudentA/Rectangle 27.png';
import profile from '../images/StudentA/Ellipse 1.png';

export default[
    {
        sr : 1,
        title : 'WebDeveloper',
        name : 'Tony Steve',
        desc : 'I have done Bachelors of Technology, Computer Science from Indian Institiute of Technology, Kanpur.',
        image : profile,
        profile : [
            {
                sr : 1,
                name : 'Topcoder',
                id : 'coder1234',
                rank : 1234,
                logo : 'https://www.topcoder.com/wp-content/uploads/2016/01/topcoder-logo.png',
            },
            {
                sr : 2,
                name : 'Leetcode',
                id : 'coder1234',
                rank : 1234,
                logo : 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/LeetCode_Logo_black_with_text.svg/1024px-LeetCode_Logo_black_with_text.svg.png',
            },
            {
                sr : 3,
                name : 'CodeChef',
                id : 'coder1234',
                rank : 1234,
                logo : 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Codechef%28new%29_logo.svg/1200px-Codechef%28new%29_logo.svg.png',
            },
            {
                sr : 4,
                name : 'GeeksforGeeks',
                id : 'coder1234',
                rank : 1234,
                logo : 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200817185016/gfg_complete_logo_2x-min.png',
            },
        ],
        achievements : [
            {
                sr : 1,
                namee : 'GeeksforGeeks',
                logo : 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200817185016/gfg_complete_logo_2x-min.png',
                id: 'coder1234',
                rank : 1234,
                contest : 'Codewars 2014 India’s FFirst Coding Competition.'
            },
        ],
        projects : [
            {
                sr : 1,
                name : 'Gentium Agency Company',
                img : project1,
                techstack : 'React + Node', 
            },
            {
                sr : 2,
                name : 'Company Raw website',
                img : project2,
                techstack : 'Angular + Firebase', 
            },
            {
                sr : 3,
                name : 'Fitness Application',
                img : project3,
                techstack : 'ReactNative + Firebase', 
            },
        ]
    }
]