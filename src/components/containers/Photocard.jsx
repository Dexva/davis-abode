import '../../styles/global.css';
import { ExternalIcon } from '../../assets/ExternalIcon';

export function Photocard({ photo }) {
  const CardContent = (
    <div class="mb-8 flex-col p-4 border-[0.5px] floating">
            <div>
              <img
              className=""
              src={photo.imgURL}
              alt={photo.title}
              loading="lazy"
              decoding="async"
              width={250}
            />
            </div>
          
            <div class="w-full flex justify-between items-end">
                <div class="mt-4 flex-col">
                  <p class="font-medium">{photo.title}</p>
                  <p class="text-sm text-neutral-500">{photo.location} | {photo.date}</p>
                </div>
                {photo.externalURL && <ExternalIcon classlist="flex w-5"/>}
            </div>
    </div>
  );

  if (photo.externalURL) {
    return (
      <a class="hover:text-flamingo" href={photo.externalURL} target="_blank">
        {CardContent}
      </a>
    );
  }

  return (
    <div class="cursor-default">
      {CardContent}
    </div>
  );
}

