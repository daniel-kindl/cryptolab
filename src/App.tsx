import { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';
import { Layout } from '@/components/layout/Layout';

// Lazy load pages
const Home = lazy(() => import('@/pages/Home').then((module) => ({ default: module.Home })));
const EncodingLab = lazy(() =>
  import('@/pages/EncodingLab').then((module) => ({ default: module.EncodingLab })),
);
const HashingLab = lazy(() =>
  import('@/pages/HashingLab').then((module) => ({ default: module.HashingLab })),
);
const EncryptionLab = lazy(() =>
  import('@/pages/EncryptionLab').then((module) => ({ default: module.EncryptionLab })),
);
const Pitfalls = lazy(() =>
  import('@/pages/Pitfalls').then((module) => ({ default: module.Pitfalls })),
);

function App() {
  return (
    <HashRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Suspense
        fallback={
          <Center h='100vh'>
            <Loader size='xl' type='dots' />
          </Center>
        }
      >
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='encoding' element={<EncodingLab />} />
            <Route path='hashing' element={<HashingLab />} />
            <Route path='encryption' element={<EncryptionLab />} />
            <Route path='pitfalls' element={<Pitfalls />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
