import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IProductFilters } from '@/interfaces';
import { adaptFiltersArr } from '@/utils';

export const useFiltersMenu = () => {
  const [filters, setFilters] = useState<IProductFilters[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [checkedFilters, setCheckedFilters] = useState(0);

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchFilters = async () => {
      setLoading(true);

      try {
        const url = `${process.env.API_BASE_URL}/storefront/filters`;
        const resp = await fetch(url);
        const { ok, filters: fetchedFilters, error: apiError } = await resp.json();
        
        if (!ok) return setError(apiError);

        const activeFilters: IProductFilters[] = JSON.parse(searchParams.get('filters') as string);

        setFilters(fetchedFilters.map((filter: any) => {
          const activeFilter: any = activeFilters?.find(activeFilter => Object.keys(activeFilter)[0] === filter.name);

          if (!activeFilter) {
            return {
              ...filter,
              values: filter.values.map((value: string, i: number) => {
                return {
                  _id: i, value, checked: false
                };
              })
            };
          }

          const activeValues: string[] = activeFilter[filter.name];
          return {
            ...filter,
            values: filter.values.map((value: string, i: number) => {
              return {
                _id: i, value, checked: activeValues.includes(value)
              };
            })
          };
        }));

      } catch (error: any) {
        console.error(error);
        setError('Error while fetching products.');

      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCheckedFilters(filters.filter((item) => {
      return item.values.some((value) => value.checked);
    }).length);
  }, [filters]);

  const toggleFilterCheckbox = (filterId: string, valueId: number) => {
    const updatedFilters = filters.map(filter => {
      if (filter._id !== filterId) return filter;

      return {
        ...filter,
        values: filter.values.map(val => {
          if (val._id !== valueId) return val;

          return {
            ...val,
            checked: !val.checked
          };
        })
      };
    });

    const adaptedFiltersArr = adaptFiltersArr(updatedFilters);
    const urlFilters = encodeURIComponent(JSON.stringify(adaptedFiltersArr));

    router.push(`${ pathName }${ adaptedFiltersArr.length > 0 ? `?filters=${ urlFilters }` : '' }`);

    setFilters(updatedFilters);
  };

  const resetFilters = () => {
    setFilters(prev => prev.map(filter => {
      return {
        ...filter,
        values: filter.values.map(val => ({
          ...val,
          checked: false
        }))
      };
    }));

    router.push('/products');
  };

  return {
    loading,
    error,
    filters,
    checkedFilters,
    toggleFilterCheckbox,
    resetFilters
  };
};
