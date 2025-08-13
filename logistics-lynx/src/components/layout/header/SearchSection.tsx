
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface SearchSectionProps {
  isMobile?: boolean;
}

const SearchSection: React.FC<SearchSectionProps> = ({ isMobile = false }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Search Bar - Desktop */}
      <div className="relative hidden md:block flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search everything..."
          className="w-full pl-10 h-10 bg-background/50 border-border/60 focus:border-primary/60 focus:ring-primary/20 rounded-xl transition-all duration-200 text-sm"
        />
      </div>

      {/* Mobile Search Sheet */}
      {isMobile && (
        <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden rounded-xl">
              <Search className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="h-auto bg-background/95 backdrop-blur-xl">
            <SheetHeader>
              <SheetTitle>Search</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <Input
                placeholder="Search everything..."
                className="w-full rounded-xl h-12 text-base"
                autoFocus
              />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default SearchSection;
