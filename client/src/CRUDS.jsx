
import { getById, updateEntity, deleteEntity, addEntity, sortEntities, searchEntities, SUCCESS, FAILED, NOT_FOUND} from "./DB_API";

export async function fetchEntities({entity,setEntities,setMessage},url) {
    const { data, status } = await getById(url);
    if (status === FAILED) {
        setMessage(`Failed getting ${entity}.`);
        return;
    }
    if (status === NOT_FOUND) {
        setMessage(`No ${entity}. Click + to add.`);
    }
    setEntities(data);
}

export async function handleUpdateEntity({entity,setEntities,setMessage},selectedId,updatedAttribue) {
    const { status } = await updateEntity(entity, selectedId,updatedAttribue);

    if (status === SUCCESS) {
        setMessage(`${entity} updated successfully!`);
        setEntities(prevEntities =>
            prevEntities.map(entity => (entity.id === selectedId ? { ...entity, ...updatedAttribue } : entity))
        );
    } else {
        setMessage(`Failed to update ${entity}.`);
    }
}

export async function handleDeleteEntity({entity,setEntities,setMessage},selectedId,url) {
    const { status } = await deleteEntity(url);

    if (status === SUCCESS) {
        setMessage(`${entity} deleted successfully!`);
        setEntities(prevEntities => prevEntities.filter(entity => entity.id !== selectedId));
    } else if (status === NOT_FOUND) {
        setMessage(`${entity} not found.`);
    } else {
        setMessage(`Failed to delete ${entity}.`);
    }
}

export async function handleAddEntity({entity,setEntities,setMessage},setIsAdding,newEntity,url) {
    
    const { data, status } = await addEntity(url,newEntity);

    if (status === SUCCESS) {
        setMessage(`${entity} added successfully!`);
        setEntities(prevEntities => [...prevEntities, data]);
        setIsAdding(false);
    } else {
        setMessage(`Failed to add ${entity}.`);
    }
}

export async function handleSort({entity,setEntities,setMessage,currentEntity},sortRef) {
    const { data, status } = await sortEntities(entity, currentEntity.id, sortRef.current.value);
    if (status === SUCCESS) {
        setMessage(`${entity} sorted successfully!`);
        setEntities(data);
    } else if (status === NOT_FOUND) {
        setMessage(`No ${entity} found for sorting.`);
    } else {
        setMessage(`Failed to sort ${entity}.`);
    }
}

export async function handleSearch({entity,setEntities,setMessage},url) {
    const { data, status } = await searchEntities(url);
    if (status === SUCCESS) {
        setMessage(`${entity} search completed successfully.`);
        setEntities(data);
    } else if (status === NOT_FOUND) {
        setMessage(`No results found.`);
        setEntities([]);
    } else {
        setMessage(`Failed to search ${entity}.`);
    }
}

