import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
};

const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center flex-1 gap-3 justify-between flex-row border-2 rounded-full p-2 mx-auto w-full max-w-3xl ${
          form.formState.errors.searchQuery && "border-green-600"
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={25}
          className="ml-2 text-green-600 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="border-none shadow-none text-lg focus-visible:ring-0"
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          onClick={handleReset}
          type="button"
          variant="outline"
          className="rounded-full text-sm px-4 py-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
        >
          Reset
        </Button>
        <Button
          type="submit"
          className="rounded-full bg-green-600 text-white text-sm px-6 py-2 hover:bg-white hover:text-green-600 border border-green-600"
        >
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
