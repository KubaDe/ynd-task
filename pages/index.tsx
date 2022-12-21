import SearchBox from '@components/SearchBox';
import SearchInfo from '@components/SearchInfo';
import SearchResults from '@components/SearchResults';
import BaseLayout from '@components/layouts/BaseLayout';

export default function Home() {
  return (
    <BaseLayout>
      <SearchBox />
      <SearchInfo />
      <SearchResults />
    </BaseLayout>
  );
}
