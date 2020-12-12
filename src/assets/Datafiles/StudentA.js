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
            },
            {
                sr : 2,
                name : 'Leetcode',
                id : 'coder1234',
                rank : 1234,
            },
            {
                sr : 3,
                name : 'CodeChef',
                id : 'coder1234',
                rank : 1234,
            },
            {
                sr : 4,
                name : 'GeeksforGeeks',
                id : 'coder1234',
                rank : 1234,
            },
        ],
        achievements : [
            {
                sr : 1,
                namee : 'GeeksforGeeks',
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