<script lang="ts"> 
    import {Form} from '$lib/components';
    import {Input} from '$lib/components';
    import { createCarPost } from '$lib/helpers';
    import { CAR_POST_FORM_ID } from '$lib/constants/forms';

    const formId = CAR_POST_FORM_ID;

</script>

<Form action="" id={formId} validationSchema={createCarPost}>
    <Input type="text" label="Título" name="title"formId={formId}  />
</Form>