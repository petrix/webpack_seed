import './index.less';
import { Navbar } from './scripts/navbar.js';
import { Carousel } from './scripts/carousel.js';
import { Tabs } from './scripts/tabs.js';
import { TabsDinamic } from './scripts/tabsDinamic.js';
import { TaskList } from './scripts/taskList/taskList.component.js';
import './scripts/chain.js';

const globalNavbar = new Navbar('.global-navbar');
const categoriesNavbar = new Navbar('.categories-navbar');
const headerCarousel = new Carousel('.header-carousel', {
    withPager: true
});

const tabs = new Tabs('.tabs-static');

const tabsDynamic = new TabsDinamic('.tabs-dinamic', [
    {
        title: 'Tab first',
        content: 'Tab content 1'
    },
    {
        title: 'Tab second',
        content: 'Tab content 2'
    },
    {
        title: 'Tab first',
        content: 'Tab content 3'
    },
    {
        title: 'Tab first',
        content: 'Tab content 4'
    }
]);

const myTasks = new TaskList('.my-task-list');
