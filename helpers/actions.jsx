'use server';

import {saveService} from "../helpers/service";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

function isInvalidText(text) {
    return !text || text.trim() === '';
}
export async function shareServices(prevState, formData) {
    const service = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        icon: formData.get('icon'),
        image: formData.get('image'),
    }

    if (isInvalidText(service.title) ||
        isInvalidText(service.summary) ||
        isInvalidText(service.icon) ||
        !service.icon ||
        !service.icon.size === 0||
        isInvalidText(service.image) ||
        !service.image ||
        !service.image.size === 0
    ) {
        return {
            message: 'Invalid Input'
        };
    }

    await saveService(service);
    revalidatePath('/');
    redirect('/');
}