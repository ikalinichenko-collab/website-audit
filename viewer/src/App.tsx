import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout.js";
import { RunProvider } from "./context/RunContext.js";
import { Overview } from "./pages/Overview.js";
import { PageDetail } from "./pages/PageDetail.js";
import { PagesTable } from "./pages/PagesTable.js";
import { SiteView } from "./pages/SiteView.js";
import { RunPage } from "./pages/RunPage.js";
import { Sources } from "./pages/Sources.js";
import { Settings } from "./pages/Settings.js";

export function App() {
  return (
    <RunProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="pages" element={<PagesTable />} />
            <Route path="pages/:slug" element={<PageDetail />} />
            <Route path="site" element={<SiteView />} />
            <Route path="run" element={<RunPage />} />
            <Route path="sources" element={<Sources />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </RunProvider>
  );
}
