import { useState } from "react";
import Header from "./Header";
import FilterSidebar from "./FilterSidebar";
import DestinationGrid from "./DestinationGrid";
import Footer from "./Footer";

const LOGO_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAtrLF1pVSAdehfs3yTU4MzEtjdm-cuUKe-wxYMIV_ekYHZrjTtcB2vQRv7wy3GvsEdzkJ6kdvY-irPukErP2qNIXEb_5LIuTFTnqFC2zTgHOooUfq2Coh2SbZ8-JOXIZv7lZwF8ZbY8E3ZoXw6pel1ECTt_F5yx7IdM7o8_TXpDoSNLqkncUinizPJ0qSUZ_migTwVsO0iyCfwHJg1AX-I9CmI277Ry3_tim_zfreSZQQtgK94fAcxdA";

const MAP_SRC = "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg";

const destinationsData = [];

/**
 * Route target, e.g. <Route path="/destinations" element={<DestinationsPage />} />
 *
 * Drop this in wherever your router mounts pages. If your app already has a
 * shared <Header> / <Footer> rendered by a layout route, delete the two below
 * and keep just the <main> block.
 */
export default function Destination() {
  const [sort, setSort] = useState("trending");
  const [destinations] = useState(destinationsData);

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen">
      <Header activePath="destinations" logoSrc={LOGO_SRC} />

      <main className="w-full pt-20 bg-background">
        <div className="flex flex-col w-full px-margin-desktop py-12">
          <div className="flex flex-col md:flex-row gap-12 max-w-container-max-width mx-auto w-full">
            <FilterSidebar mapImageSrc={MAP_SRC} />
            <DestinationGrid
              destinations={destinations}
              sort={sort}
              onSortChange={setSort}
              onLoadMore={() => console.log("Load more destinations")}
            />
          </div>
        </div>
      </main>

      <Footer logoSrc={LOGO_SRC} />
    </div>
  );
}
