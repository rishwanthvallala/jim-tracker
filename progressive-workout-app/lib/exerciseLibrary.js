// /lib/exerciseLibrary.js
export const WORKOUT_CYCLE = ['Push', 'Pull', 'Legs', 'Rest'];

export const SPLIT_ROUTINES = {
  Push: ['chest', 'shoulders', 'core'],
  Pull: ['back'],
  Legs: ['legs', 'core'],
  Rest: [],
};


export const MUSCLE_GROUPS = ["chest", "shoulders", "back", "legs", "core"];

export const EXERCISE_LIBRARY = {
  chest: [
    {
      step: 0,
      name: "Decline Push-ups",
      description: "Feet elevated on a chair or step. This increases the load on your upper chest and shoulders.",
      goal: { sets: 3, reps: 12 }
    },
    {
      step: 1,
      name: "Weighted Push-ups",
      description: "Wear a backpack filled with books or water bottles to add direct, measurable resistance.",
      goal: { sets: 3, reps: 12 }
    },
    {
      step: 2,
      name: "Deficit Push-ups",
      description: "Place your hands on two stacks of books or yoga blocks to allow your chest to go deeper than your hands, increasing the range of motion and stretch.",
      goal: { sets: 3, reps: 10 }
    },
    {
      step: 3,
      name: "Archer Push-ups",
      description: "As you lower, shift your weight to one side, keeping the other arm nearly straight. This is the first step toward one-arm strength.",
      goal: { sets: 3, reps: 8 }
    },
    {
      step: 4,
      name: "Pseudo Planche Push-ups",
      description: "Move your hands back so they are level with your lower ribs and lean forward. This dramatically increases the load on your chest and shoulders.",
      goal: { sets: 3, reps: 8 }
    },
    {
      step: 5,
      name: "One-Arm Push-up Negatives",
      description: "Place feet wide for balance. Lower yourself as slowly as possible on a single arm.",
      goal: { sets: 4, reps: 5 }
    },
    {
      step: 6,
      name: "Incline One-Arm Push-ups",
      description: "Perform a one-arm push-up with your supporting hand on a raised surface. Lower the surface as you get stronger.",
      goal: { sets: 3, reps: 8 }
    },
    {
      step: 7,
      name: "The One-Arm Push-up",
      description: "A classic display of pushing strength. Keep your core tight and your feet relatively wide for balance.",
      goal: { sets: 4, reps: 5 }
    },
    {
      step: 8,
      name: "Weighted Deficit Push-ups",
      description: "Combine the principles of Step 2 and Step 3 for maximum muscle stimulus.",
      goal: { sets: 3, reps: 10 }
    },
    {
      step: 9,
      name: "One-Arm/One-Leg Push-up",
      description: "The ultimate progression in bodyweight pushing stability and strength, requiring immense core and chest power.",
      goal: { sets: 4, reps: 5 }
    },
  ],
  shoulders: [
    {
      step: 0,
      name: "Pike Push-ups (Feet Elevated)",
      description: "Place your feet on a chair to put more of your bodyweight directly over your shoulders.",
      goal: { sets: 3, reps: 10 }
    },
    {
      step: 1,
      name: "Wall Handstand Push-ups (Partial ROM)",
      description: "Focus on increasing the number of controlled reps.",
      goal: { sets: 3, reps: 10 }
    },
    {
      step: 2,
      name: "Wall Handstand Push-ups (Full ROM)",
      description: "Elevate your hands on books or blocks so your head can go lower than your hands, creating a full range of motion.",
      goal: { sets: 3, reps: 8 }
    },
    {
      step: 3,
      name: "Wide-Grip Wall Handstand Push-ups",
      description: "A wider hand placement shifts the emphasis more onto the deltoids.",
      goal: { sets: 3, reps: 8 }
    },
    {
      step: 4,
      name: "Handstand Push-up Negatives (Wall)",
      description: "From the top of a wall handstand, lower yourself down over 5-8 seconds. Kick back up and repeat.",
      goal: { sets: 4, reps: 5 }
    },
    {
      step: 5,
      name: "90-Degree Push-ups",
      description: "A pseudo-planche push-up variation where you lower down until your upper arms are parallel to the floor, hold, and push back up.",
      goal: { sets: 3, reps: 6 }
    },
    {
      step: 6,
      name: "Freestanding Handstand Holds",
      description: "Move away from the wall. This is a stability step. Goal is a 30-60 second hold.",
      goal: { sets: 4, reps: 30 } // Reps here can signify seconds
    },
    {
      step: 7,
      name: "Freestanding Handstand Push-up Negatives",
      description: "The next level of control. Lower yourself slowly without wall support.",
      goal: { sets: 4, reps: 4 }
    },
    {
      step: 8,
      name: "Freestanding Handstand Push-ups",
      description: "A master-level skill requiring huge strength and balance.",
      goal: { sets: 4, reps: 5 }
    },
    {
      step: 9,
      name: "Weighted Wall Handstand Push-ups",
      description: "Go back to the wall for stability and add weight via a weighted vest. A pure hypertrophy finisher.",
      goal: { sets: 3, reps: 8 }
    },
  ],
  back: [
    {
      step: 0,
      name: "Close-Grip Chin-ups",
      description: "An underhand grip with hands close together. This heavily targets the biceps.",
      goal: { sets: 3, reps: 10 }
    },
    {
      step: 1,
      name: "Weighted Pull-ups / Chin-ups",
      description: "Use a backpack with weights. The most effective way to build a bigger back and biceps.",
      goal: { sets: 3, reps: 8 }
    },
    {
      step: 2,
      name: "Archer Pull-ups",
      description: "As you pull up towards one hand, the other arm extends to the side, providing minimal assistance.",
      goal: { sets: 3, reps: 6 }
    },
    {
      step: 3,
      name: "Typewriter Pull-ups",
      description: "Pull your chin above the bar, then slide your body from one hand to the other while staying above the bar.",
      goal: { sets: 3, reps: 5 }
    },
    {
      step: 4,
      name: "Assisted One-Arm Chin-up (Hold Wrist)",
      description: "Grab the bar with your working hand and hold that same wrist with your other hand for support.",
      goal: { sets: 4, reps: 5 }
    },
    {
      step: 5,
      name: "One-Arm Chin-up Negatives",
      description: "Get your chin over the bar using two hands, then let go with one and lower yourself as slowly as you can.",
      goal: { sets: 4, reps: 5 }
    },
    {
      step: 6,
      name: "Banded One-Arm Chin-ups",
      description: "Use a resistance band for assistance, or loop a towel over the bar and hold it with your non-working hand.",
      goal: { sets: 3, reps: 6 }
    },
    {
      step: 7,
      name: "The One-Arm Chin-up",
      description: "A legendary feat of pulling strength.",
      goal: { sets: 4, reps: 3 }
    },
    {
      step: 8,
      name: "Front Lever Tucks / Raises",
      description: "Hang from the bar and pull your body up to a horizontal position with your knees tucked in.",
      goal: { sets: 3, reps: 8 }
    },
    {
      step: 9,
      name: "Advanced Front Lever",
      description: "Progress from the tuck to a straddle or finally to a full front lever. An elite static hold.",
      goal: { sets: 4, reps: 10 } // Reps here can signify seconds
    },
  ],
  legs: [
    {
      step: 0,
      name: "Bulgarian Split Squats",
      description: "Place your back foot on a chair and perform a single-leg squat. This builds stability and targets the quads and glutes.",
      goal: { sets: 3, reps: 12 }
    },
    {
      step: 1,
      name: "Assisted Pistol Squats",
      description: "Hold onto a doorframe or post for balance while performing a one-legged squat.",
      goal: { sets: 3, reps: 10 }
    },
    {
      step: 2,
      name: "Pistol Squat Negatives",
      description: "On one leg, lower yourself into a full squat over 5-8 seconds. Use both legs to stand back up.",
      goal: { sets: 4, reps: 6 }
    },
    {
      step: 3,
      name: "Box Pistol Squats",
      description: "Perform a pistol squat until you are seated on a low surface. Press back up with the one leg.",
      goal: { sets: 3, reps: 8 }
    },
    {
      step: 4,
      name: "The Full Pistol Squat",
      description: "A complete, unassisted one-legged squat.",
      goal: { sets: 4, reps: 6 }
    },
    {
      step: 5,
      name: "Weighted Bulgarian Split Squats",
      description: "Return to this more stable exercise and load it heavily with a weighted backpack for pure muscle growth.",
      goal: { sets: 3, reps: 10 }
    },
    {
      step: 6,
      name: "Weighted Pistol Squats",
      description: "Add weight to your pistols, holding it in front of you for counterbalance.",
      goal: { sets: 3, reps: 8 }
    },
    {
      step: 7,
      name: "Natural Leg Extensions",
      description: "Kneel on a padded surface, lean back slightly, and then extend your knees to lift your torso using only your quads.",
      goal: { sets: 3, reps: 12 }
    },
    {
      step: 8,
      name: "Natural GHR Negatives (Nordic Curls)",
      description: "Anchor your feet under a heavy sofa. Lower your torso towards the floor as slowly as possible, using only your hamstrings.",
      goal: { sets: 4, reps: 6 }
    },
    {
      step: 9,
      name: "The Full Natural Glute-Ham Raise",
      description: "The ultimate bodyweight hamstring builder, requiring you to pull your entire torso back up using only your hamstrings.",
      goal: { sets: 4, reps: 5 }
    },
  ],
  core: [
    {
      step: 0,
      name: "Hanging Knee Raises",
      description: "Hang from a pull-up bar and raise your knees to your chest without swinging.",
      goal: { sets: 3, reps: 15 }
    },
    {
      step: 1,
      name: "Hanging Leg Raises (to 90 Degrees)",
      description: "Keep your legs straight and raise them until they are parallel to the floor (L-sit).",
      goal: { sets: 3, reps: 12 }
    },
    {
      step: 2,
      name: "Toes-to-Bar",
      description: "Hang from the bar and raise your straight legs all the way up until your toes touch the bar.",
      goal: { sets: 3, reps: 10 }
    },
    {
      step: 3,
      name: "Dragon Flag Negatives (Flat Legs)",
      description: "Lie on a bench, grab the edge behind your head, and lower your entire body down as slowly as possible.",
      goal: { sets: 4, reps: 6 }
    },
    {
      step: 4,
      name: "The Full Dragon Flag",
      description: "The signature move of Bruce Lee. Perform full, controlled reps.",
      goal: { sets: 4, reps: 5 }
    },
    {
      step: 5,
      name: "Ab Wheel Rollouts (from Knees)",
      description: "An ab wheel is a cheap and incredibly effective home tool.",
      goal: { sets: 3, reps: 12 }
    },
    {
      step: 6,
      name: "Front Lever Tuck Holds & Raises",
      description: "From a hanging position, pull your tucked body up into a front lever position.",
      goal: { sets: 3, reps: 8 }
    },
    {
      step: 7,
      name: "Standing Ab Wheel Rollout Negatives",
      description: "From your feet, slowly roll out as far as you can, lowering your body to the floor.",
      goal: { sets: 4, reps: 5 }
    },
    {
      step: 8,
      name: "The Standing Ab Wheel Rollout",
      description: "Perform full, controlled rollouts from a standing position.",
      goal: { sets: 4, reps: 5 }
    },
    {
      step: 9,
      name: "Full Front Lever Raises",
      description: "From a dead hang, pull your entire straight body up into a front lever. The ultimate combination of lat and core strength.",
      goal: { sets: 4, reps: 4 }
    },
  ],
};