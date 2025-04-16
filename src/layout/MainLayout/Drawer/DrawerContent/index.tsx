// project import
// import SimpleBar from '../../../../components/third-party/SimpleBar';
import SimpleBarScroll from '@/components/third-party/SimpleBar';
import NavCard from './NavCard';
import Navigation from './Navigation';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
    <SimpleBarScroll
        sx={{
            '& .simplebar-content': {
                display: 'flex',
                flexDirection: 'column'
            }
        }}
    >
        <Navigation />
        <NavCard />
    </SimpleBarScroll>
);

export default DrawerContent;
