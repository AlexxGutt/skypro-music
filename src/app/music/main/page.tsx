'use client';
import Centerblock from '@/app/components/Centerblock/Centerblock';
import { useAppSelector } from '@/app/store/store';

export default function Home() {
  const { fetchError, fetchIsLoading, allTracks, filteredTracks } =
    useAppSelector((state) => state.tracks);

  return (
    <Centerblock
      pagePlaylist={allTracks}
      tracks={filteredTracks}
      isLoading={fetchIsLoading}
      error={fetchError}
    />
  );
}
