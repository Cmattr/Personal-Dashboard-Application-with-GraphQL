import { useQuery } from "@apollo/client";
import { GET_COMMENTS, GET_USER, GET_USER_POST, GET_TODO} from "../Queries/Queries";

export const useUser = (id: string) => {
    const { data, loading, error } = useQuery(GET_USER, {
        variables: { id },
    });
    return { data, loading, error };
};

export const usePost = (id: string) => {
    const { data, loading, error } = useQuery(GET_USER_POST);
    return { data, loading, error };
};

export const useComment =(id: string) => {
    const { data, loading, error } = useQuery(GET_COMMENTS, {
        variables: {id},
    });
    return { data, loading, error }
}

export const useTodos = (id: string) => {
    const { data, loading, error} = useQuery(GET_TODO, {
        variables: {id}
    });
    return {data, loading, error};
};